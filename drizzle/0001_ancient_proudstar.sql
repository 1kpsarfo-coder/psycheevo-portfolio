CREATE TABLE `activityFeed` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`eventType` varchar(64) NOT NULL,
	`eventTitle` varchar(255) NOT NULL,
	`eventDescription` text,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	`metadata` text,
	CONSTRAINT `activityFeed_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `dashboardStats` (
	`id` int AUTO_INCREMENT NOT NULL,
	`totalUsers` int DEFAULT 0,
	`activeUsersToday` int DEFAULT 0,
	`totalLogins` int DEFAULT 0,
	`lastUpdated` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `dashboardStats_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `loginHistory` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`loginTime` timestamp NOT NULL DEFAULT (now()),
	`ipAddress` varchar(45),
	`userAgent` text,
	`loginMethod` varchar(64) DEFAULT 'oauth',
	CONSTRAINT `loginHistory_id` PRIMARY KEY(`id`)
);
