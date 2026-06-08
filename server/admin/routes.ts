import { Application, Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, "../../data");
const PORTFOLIO_FILE = path.join(DATA_DIR, "portfolio.json");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");
const UPLOAD_DIR = path.resolve(__dirname, "../../client/public/portfolio");

// ─── Helpers ────────────────────────────────────────────────────────────────

function readJSON(file: string) {
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

function writeJSON(file: string, data: unknown) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
}

function generateToken(password: string): string {
  return crypto.createHmac("sha256", password).update("psycheevo-admin").digest("hex");
}

function verifyToken(token: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || "psycheevo2024";
  const expected = generateToken(adminPassword);
  return token === expected;
}

// ─── Auth middleware ─────────────────────────────────────────────────────────

function requireAuth(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization || "";
  const token = auth.replace("Bearer ", "").trim();
  if (!token || !verifyToken(token)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

// ─── Inline multipart parser (no multer needed) ──────────────────────────────

function parseBase64Upload(
  base64Data: string,
  filename: string,
  projectId: string
): string {
  const matches = base64Data.match(/^data:([^;]+);base64,(.+)$/);
  if (!matches) throw new Error("Invalid base64 image data");
  const ext = matches[1].split("/")[1] || "jpg";
  const buffer = Buffer.from(matches[2], "base64");
  const safeFilename = `${projectId}-${Date.now()}-${filename.replace(/[^a-z0-9.-]/gi, "_")}`;
  const finalName = safeFilename.endsWith(`.${ext}`) ? safeFilename : `${safeFilename}.${ext}`;
  const uploadPath = path.join(UPLOAD_DIR, finalName);
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  fs.writeFileSync(uploadPath, buffer);
  return `/portfolio/${finalName}`;
}

// ─── Router ─────────────────────────────────────────────────────────────────

export function registerAdminRoutes(app: Application) {

  // ── Public endpoints (no auth) ──────────────────────────────────────────

  app.get("/api/public/portfolio", (_req, res) => {
    res.json(readJSON(PORTFOLIO_FILE));
  });

  app.get("/api/public/content", (_req, res) => {
    res.json(readJSON(CONTENT_FILE));
  });

  // ── Auth ────────────────────────────────────────────────────────────────

  app.post("/api/admin/login", (req: Request, res: Response) => {
    const { password } = req.body as { password: string };
    const adminPassword = process.env.ADMIN_PASSWORD || "psycheevo2024";
    if (password !== adminPassword) {
      res.status(401).json({ error: "Wrong password" });
      return;
    }
    const token = generateToken(adminPassword);
    res.json({ token });
  });

  app.get("/api/admin/verify", requireAuth, (_req, res) => {
    res.json({ ok: true });
  });

  // ── Portfolio CRUD ──────────────────────────────────────────────────────

  app.get("/api/admin/portfolio", requireAuth, (_req, res) => {
    res.json(readJSON(PORTFOLIO_FILE));
  });

  app.post("/api/admin/portfolio", requireAuth, (req: Request, res: Response) => {
    const projects = readJSON(PORTFOLIO_FILE);
    const body = req.body as Record<string, unknown>;
    const newProject = {
      id: `project-${Date.now()}`,
      title: body.title || "Untitled",
      category: body.category || "Branding",
      description: body.description || "",
      tags: body.tags || [],
      images: [],
      year: body.year || new Date().getFullYear().toString(),
      featured: body.featured || false,
      order: projects.length + 1,
    };
    projects.push(newProject);
    writeJSON(PORTFOLIO_FILE, projects);
    res.json(newProject);
  });

  app.put("/api/admin/portfolio/:id", requireAuth, (req: Request, res: Response) => {
    const projects = readJSON(PORTFOLIO_FILE) as Record<string, unknown>[];
    const idx = projects.findIndex((p: Record<string, unknown>) => p.id === req.params.id);
    if (idx === -1) { res.status(404).json({ error: "Not found" }); return; }
    projects[idx] = { ...projects[idx], ...req.body, id: req.params.id };
    writeJSON(PORTFOLIO_FILE, projects);
    res.json(projects[idx]);
  });

  app.delete("/api/admin/portfolio/:id", requireAuth, (req: Request, res: Response) => {
    let projects = readJSON(PORTFOLIO_FILE) as Record<string, unknown>[];
    projects = projects.filter((p: Record<string, unknown>) => p.id !== req.params.id);
    writeJSON(PORTFOLIO_FILE, projects);
    res.json({ ok: true });
  });

  // ── Image upload (base64) ────────────────────────────────────────────────

  app.post("/api/admin/portfolio/:id/images", requireAuth, (req: Request, res: Response) => {
    const { imageData, filename } = req.body as { imageData: string; filename: string };
    try {
      const url = parseBase64Upload(imageData, filename, req.params.id);
      const projects = readJSON(PORTFOLIO_FILE) as Record<string, unknown>[];
      const idx = projects.findIndex((p: Record<string, unknown>) => p.id === req.params.id);
      if (idx === -1) { res.status(404).json({ error: "Not found" }); return; }
      const images = (projects[idx].images as string[]) || [];
      images.push(url);
      projects[idx] = { ...projects[idx], images };
      writeJSON(PORTFOLIO_FILE, projects);
      res.json({ url, images });
    } catch (e) {
      res.status(400).json({ error: String(e) });
    }
  });

  app.delete("/api/admin/portfolio/:id/images", requireAuth, (req: Request, res: Response) => {
    const { url } = req.body as { url: string };
    const projects = readJSON(PORTFOLIO_FILE) as Record<string, unknown>[];
    const idx = projects.findIndex((p: Record<string, unknown>) => p.id === req.params.id);
    if (idx === -1) { res.status(404).json({ error: "Not found" }); return; }
    const images = ((projects[idx].images as string[]) || []).filter((u: string) => u !== url);
    projects[idx] = { ...projects[idx], images };
    writeJSON(PORTFOLIO_FILE, projects);
    // Delete file from disk if it's a local portfolio file
    try {
      const filename = path.basename(url);
      const filePath = path.join(UPLOAD_DIR, filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } catch (_) { /* ignore */ }
    res.json({ ok: true, images });
  });

  // ── Reorder images ───────────────────────────────────────────────────────

  app.put("/api/admin/portfolio/:id/images/reorder", requireAuth, (req: Request, res: Response) => {
    const { images } = req.body as { images: string[] };
    const projects = readJSON(PORTFOLIO_FILE) as Record<string, unknown>[];
    const idx = projects.findIndex((p: Record<string, unknown>) => p.id === req.params.id);
    if (idx === -1) { res.status(404).json({ error: "Not found" }); return; }
    projects[idx] = { ...projects[idx], images };
    writeJSON(PORTFOLIO_FILE, projects);
    res.json({ ok: true });
  });

  // ── Content CRUD ─────────────────────────────────────────────────────────

  app.get("/api/admin/content", requireAuth, (_req, res) => {
    res.json(readJSON(CONTENT_FILE));
  });

  app.put("/api/admin/content", requireAuth, (req: Request, res: Response) => {
    const current = readJSON(CONTENT_FILE);
    const updated = { ...current, ...req.body };
    writeJSON(CONTENT_FILE, updated);
    res.json(updated);
  });

  // Patch a specific section
  app.patch("/api/admin/content/:section", requireAuth, (req: Request, res: Response) => {
    const content = readJSON(CONTENT_FILE);
    content[req.params.section] = req.body;
    writeJSON(CONTENT_FILE, content);
    res.json(content[req.params.section]);
  });
}
