-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema pastiara_schema
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema pastiara_schema
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pastiara_schema` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `pastiara_schema` ;

-- -----------------------------------------------------
-- Table `pastiara_schema`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pastiara_schema`.`products` (
  `ProductID` INT NOT NULL AUTO_INCREMENT,
  `ProductName` VARCHAR(30) NOT NULL,
  `Category` VARCHAR(20) NOT NULL,
  `ProductPrice` INT NOT NULL,
  `ProductDescription` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`ProductID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pastiara_schema`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pastiara_schema`.`users` (
  `UserID` INT NOT NULL AUTO_INCREMENT,
  `Email` VARCHAR(50) NULL DEFAULT NULL,
  `Password` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`UserID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pastiara_schema`.`favorites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pastiara_schema`.`favorites` (
  `FavoritesID` INT NOT NULL,
  `ProductID` INT NOT NULL,
  `UserID` INT NOT NULL,
  PRIMARY KEY (`FavoritesID`),
  INDEX `ProductID_idx` (`ProductID` ASC),
  INDEX `UserID_FK_idx` (`UserID` ASC),
  CONSTRAINT `ProductID_FK`
    FOREIGN KEY (`ProductID`)
    REFERENCES `pastiara_schema`.`products` (`ProductID`),
  CONSTRAINT `UserID`
    FOREIGN KEY (`UserID`)
    REFERENCES `pastiara_schema`.`users` (`UserID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pastiara_schema`.`tickets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pastiara_schema`.`tickets` (
  `TicketID` INT NOT NULL AUTO_INCREMENT,
  `UserID` INT NOT NULL,
  `TicketDate` DATETIME NOT NULL,
  `Total` INT NOT NULL,
  `EventType` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`TicketID`),
  INDEX `UserID_idx` (`UserID` ASC),
  CONSTRAINT `UserID_FK`
    FOREIGN KEY (`UserID`)
    REFERENCES `pastiara_schema`.`users` (`UserID`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pastiara_schema`.`product_has_tickets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pastiara_schema`.`product_has_tickets` (
  `ProductID` INT NOT NULL,
  `TicketID` INT NOT NULL,
  PRIMARY KEY (`ProductID`, `TicketID`),
  INDEX `ticketID_FK_idx` (`TicketID` ASC),
  CONSTRAINT `productID`
    FOREIGN KEY (`ProductID`)
    REFERENCES `pastiara_schema`.`products` (`ProductID`),
  CONSTRAINT `ticketID_FK`
    FOREIGN KEY (`TicketID`)
    REFERENCES `pastiara_schema`.`tickets` (`TicketID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pastiara_schema`.`users_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pastiara_schema`.`users_info` (
  `Users_infoID` INT NOT NULL,
  `Name` VARCHAR(50) NOT NULL,
  `Last_name` VARCHAR(50) NOT NULL,
  `Telephone` CHAR(15) NOT NULL,
  `State` VARCHAR(30) NULL DEFAULT NULL,
  `Zipcode` CHAR(15) NULL DEFAULT NULL,
  `Street` VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (`Users_infoID`),
  CONSTRAINT `UserInfo_FK`
    FOREIGN KEY (`Users_infoID`)
    REFERENCES `pastiara_schema`.`users` (`UserID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
