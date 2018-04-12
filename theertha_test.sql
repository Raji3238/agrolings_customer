-- MySQL dump 10.13  Distrib 5.7.21, for osx10.12 (x86_64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	5.7.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `client` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `client_address` text NOT NULL,
  `phone_number` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (1,'Raji','Angels Pg,Pallikaranai',960034184);
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_data`
--

DROP TABLE IF EXISTS `payment_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `payment_type_id` int(11) NOT NULL,
  `data_name` varchar(255) NOT NULL,
  `data_type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `payment_data_ak_1` (`payment_type_id`,`data_name`),
  CONSTRAINT `payment_data_payment_type` FOREIGN KEY (`payment_type_id`) REFERENCES `payment_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_data`
--

LOCK TABLES `payment_data` WRITE;
/*!40000 ALTER TABLE `payment_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_details`
--

DROP TABLE IF EXISTS `payment_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shipment_id` int(11) NOT NULL,
  `payment_data_id` int(11) NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `payment_details_payment_data` (`payment_data_id`),
  KEY `payment_details_shipment` (`shipment_id`),
  CONSTRAINT `payment_details_payment_data` FOREIGN KEY (`payment_data_id`) REFERENCES `payment_data` (`id`),
  CONSTRAINT `payment_details_shipment` FOREIGN KEY (`shipment_id`) REFERENCES `shipment` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_details`
--

LOCK TABLES `payment_details` WRITE;
/*!40000 ALTER TABLE `payment_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_type`
--

DROP TABLE IF EXISTS `payment_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='e.g. card, cash, paypal, wire transfer';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_type`
--

LOCK TABLES `payment_type` WRITE;
/*!40000 ALTER TABLE `payment_type` DISABLE KEYS */;
INSERT INTO `payment_type` VALUES (1,'Cash on Delivery');
/*!40000 ALTER TABLE `payment_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(64) NOT NULL,
  `product_description` varchar(255) NOT NULL,
  `product_type_id` int(11) NOT NULL,
  `unit` varchar(16) NOT NULL,
  `price_per_unit` decimal(8,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_product_type` (`product_type_id`),
  CONSTRAINT `product_product_type` FOREIGN KEY (`product_type_id`) REFERENCES `product_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (2,'Coconut Oil','Oil',1,'Liters',350.00),(3,'Groundnut oil','oil',1,'250',1.00);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `product_details`
--

DROP TABLE IF EXISTS `product_details`;
/*!50001 DROP VIEW IF EXISTS `product_details`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `product_details` AS SELECT 
 1 AS `id`,
 1 AS `product_name`,
 1 AS `product_description`,
 1 AS `type_name`,
 1 AS `unit`,
 1 AS `price_per_unit`,
 1 AS `in_stock`,
 1 AS `last_update_time`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `product_type`
--

DROP TABLE IF EXISTS `product_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_type`
--

LOCK TABLES `product_type` WRITE;
/*!40000 ALTER TABLE `product_type` DISABLE KEYS */;
INSERT INTO `product_type` VALUES (1,'cooking');
/*!40000 ALTER TABLE `product_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipment`
--

DROP TABLE IF EXISTS `shipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shipment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `time_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `payment_type_id` int(11) NOT NULL,
  `final_price` decimal(8,2) NOT NULL,
  `order_taken_person` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `shipment_client` (`client_id`),
  KEY `shipment_payment_type` (`payment_type_id`),
  CONSTRAINT `shipment_client` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`),
  CONSTRAINT `shipment_payment_type` FOREIGN KEY (`payment_type_id`) REFERENCES `payment_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9801 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipment`
--

LOCK TABLES `shipment` WRITE;
/*!40000 ALTER TABLE `shipment` DISABLE KEYS */;
INSERT INTO `shipment` VALUES (1054,1,'2018-04-11 11:17:39',1,0.00,'Sathes'),(1340,1,'2018-04-11 11:21:13',1,0.00,'Sathes'),(2989,1,'2018-04-11 10:55:46',1,0.00,'Sathes'),(3915,1,'2018-04-11 08:37:02',1,0.00,NULL),(7585,1,'2018-04-11 11:20:45',1,0.00,'Sathes'),(9706,1,'2018-04-11 11:17:24',1,0.00,'Sathes'),(9800,1,'2018-04-11 11:17:19',1,0.00,'Sathes');
/*!40000 ALTER TABLE `shipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipment_details`
--

DROP TABLE IF EXISTS `shipment_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shipment_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shipment_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quanitity` decimal(8,2) NOT NULL,
  `price_per_unit` decimal(8,2) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `shipmet_details_ak_1` (`shipment_id`,`product_id`),
  KEY `shipmet_details_product` (`product_id`),
  CONSTRAINT `shipmet_details_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `shipmet_details_shipment` FOREIGN KEY (`shipment_id`) REFERENCES `shipment` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipment_details`
--

LOCK TABLES `shipment_details` WRITE;
/*!40000 ALTER TABLE `shipment_details` DISABLE KEYS */;
INSERT INTO `shipment_details` VALUES (1,3915,2,6.00,1.00,1.00),(2,3915,3,1.00,1.00,1.00),(3,2989,3,1.00,1.00,1.00);
/*!40000 ALTER TABLE `shipment_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipment_status`
--

DROP TABLE IF EXISTS `shipment_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shipment_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shipment_id` int(11) NOT NULL,
  `status_catalog_id` int(11) NOT NULL,
  `status_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `notes` text,
  PRIMARY KEY (`id`),
  KEY `shipment_status_shipment` (`shipment_id`),
  KEY `shipment_status_status_catalog` (`status_catalog_id`),
  CONSTRAINT `shipment_status_shipment` FOREIGN KEY (`shipment_id`) REFERENCES `shipment` (`id`),
  CONSTRAINT `shipment_status_status_catalog` FOREIGN KEY (`status_catalog_id`) REFERENCES `status_catalog` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipment_status`
--

LOCK TABLES `shipment_status` WRITE;
/*!40000 ALTER TABLE `shipment_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `shipment_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_catalog`
--

DROP TABLE IF EXISTS `status_catalog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status_catalog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='list of all possible statuses: ordered, paid, delivered';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_catalog`
--

LOCK TABLES `status_catalog` WRITE;
/*!40000 ALTER TABLE `status_catalog` DISABLE KEYS */;
/*!40000 ALTER TABLE `status_catalog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stock` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `in_stock` decimal(8,2) NOT NULL,
  `last_update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_id`),
  CONSTRAINT `stock_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `product_details`
--

/*!50001 DROP VIEW IF EXISTS `product_details`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `product_details` AS select `p`.`id` AS `id`,`p`.`product_name` AS `product_name`,`p`.`product_description` AS `product_description`,`pt`.`type_name` AS `type_name`,`p`.`unit` AS `unit`,`p`.`price_per_unit` AS `price_per_unit`,`s`.`in_stock` AS `in_stock`,`s`.`last_update_time` AS `last_update_time` from ((`product` `p` left join `product_type` `pt` on((`p`.`product_type_id` = `pt`.`id`))) left join `stock` `s` on((`p`.`id` = `s`.`product_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-12 21:18:27
