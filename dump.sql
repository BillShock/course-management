CREATE DATABASE  IF NOT EXISTS `course_management` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `course_management`;
-- MySQL dump 10.16  Distrib 10.1.26-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: course_management
-- ------------------------------------------------------
-- Server version	10.1.35-MariaDB

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
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cliente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `indirizzo` varchar(30) DEFAULT NULL,
  `civico` varchar(10) DEFAULT NULL,
  `cap` char(5) DEFAULT NULL,
  `citta` varchar(30) DEFAULT NULL,
  `p_iva` varchar(30) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `note` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Via 1','123','1234','Roma','0123456789','123456789','myemail@email.email',''),(2,'Via 2','246','2468','Napoli','024682468','246824682','myemail@email.new',NULL);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `corso`
--

DROP TABLE IF EXISTS `corso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `corso` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `codice` varchar(5) NOT NULL,
  `nome` varchar(30) NOT NULL,
  `ore` int(11) NOT NULL,
  `data_inizio` date DEFAULT NULL,
  `inizio_stage` date DEFAULT NULL,
  `luogo_stage` varchar(30) DEFAULT NULL,
  `data_fine` date DEFAULT NULL,
  `data_termine10` date DEFAULT NULL,
  `aula` varchar(45) DEFAULT NULL,
  `ora_inizio` int(11) DEFAULT NULL,
  `ora_fine` int(11) DEFAULT NULL,
  `data_esame` date DEFAULT NULL,
  `note` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `corso`
--

LOCK TABLES `corso` WRITE;
/*!40000 ALTER TABLE `corso` DISABLE KEYS */;
INSERT INTO `corso` VALUES (1,'1','OSS',1000,'0000-00-00','0000-00-00','','0000-00-00','0000-00-00','1',9,13,'0000-00-00',''),(2,'2','OSA',400,'0000-00-00','0000-00-00','','0000-00-00','0000-00-00','2',14,18,'0000-00-00',NULL),(3,'3','BLSD',50,'0000-00-00','0000-00-00',NULL,'0000-00-00','0000-00-00',NULL,NULL,NULL,'0000-00-00',NULL),(4,'4','OSS',800,'0000-00-00','0000-00-00',NULL,'0000-00-00','0000-00-00',NULL,NULL,NULL,'0000-00-00',NULL);
/*!40000 ALTER TABLE `corso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dvr_strumentazione`
--

DROP TABLE IF EXISTS `dvr_strumentazione`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dvr_strumentazione` (
  `id_societa` int(11) NOT NULL,
  `nome` varchar(45) NOT NULL,
  `data_strumento` date DEFAULT NULL,
  `formazione` varchar(45) DEFAULT NULL,
  `data_formazione` date DEFAULT NULL,
  PRIMARY KEY (`id_societa`,`nome`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dvr_strumentazione`
--

LOCK TABLES `dvr_strumentazione` WRITE;
/*!40000 ALTER TABLE `dvr_strumentazione` DISABLE KEYS */;
/*!40000 ALTER TABLE `dvr_strumentazione` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fattura`
--

DROP TABLE IF EXISTS `fattura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fattura` (
  `numero` int(11) NOT NULL,
  `anno` char(4) NOT NULL,
  `data` date DEFAULT NULL,
  `prestazione` longtext,
  `importo` decimal(10,3) DEFAULT NULL,
  `iva` decimal(10,3) DEFAULT '0.000',
  `con_cassa` decimal(10,3) DEFAULT '0.000',
  `ritenuta` decimal(10,3) DEFAULT '0.000',
  `bolli` decimal(10,3) DEFAULT '0.000',
  `totale` decimal(10,3) DEFAULT '0.000',
  `id_cliente` int(11) DEFAULT NULL,
  PRIMARY KEY (`numero`,`anno`),
  KEY `fk_fattura_cliente_idx` (`id_cliente`),
  CONSTRAINT `fk_fattura_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fattura`
--

LOCK TABLES `fattura` WRITE;
/*!40000 ALTER TABLE `fattura` DISABLE KEYS */;
INSERT INTO `fattura` VALUES (1,'2017','2017-01-11','Corso OSS',1000.000,100.000,0.000,0.000,2.000,1200.000,1),(2,'2017','2017-02-22','Corso OSA',700.000,100.000,0.000,0.000,2.000,800.000,2);
/*!40000 ALTER TABLE `fattura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iscrizione`
--

DROP TABLE IF EXISTS `iscrizione`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iscrizione` (
  `codice` int(11) NOT NULL AUTO_INCREMENT,
  `idcliente` int(11) NOT NULL,
  `idcorso` int(11) NOT NULL,
  `prezzo` decimal(10,0) DEFAULT NULL,
  `esito_esame` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`codice`),
  KEY `iscrizione_cliente_fk_idx` (`idcliente`),
  KEY `iscrizione_corso_fk_idx` (`idcorso`),
  CONSTRAINT `iscrizione_cliente_fk` FOREIGN KEY (`idcliente`) REFERENCES `cliente` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `iscrizione_corso_fk` FOREIGN KEY (`idcorso`) REFERENCES `corso` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1275 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iscrizione`
--

LOCK TABLES `iscrizione` WRITE;
/*!40000 ALTER TABLE `iscrizione` DISABLE KEYS */;
INSERT INTO `iscrizione` VALUES (1,1,1,1000,''),(2,1,2,800,NULL),(3,2,1,1000,NULL),(4,2,2,700,NULL);
/*!40000 ALTER TABLE `iscrizione` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privato`
--

DROP TABLE IF EXISTS `privato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `privato` (
  `id` int(11) NOT NULL,
  `nome` varchar(30) DEFAULT NULL,
  `cognome` varchar(30) DEFAULT NULL,
  `data_nascita` date DEFAULT NULL,
  `cf` char(16) DEFAULT NULL,
  UNIQUE KEY `CF_UNIQUE` (`cf`),
  KEY `fk_privato_idx` (`id`),
  CONSTRAINT `fk_privato` FOREIGN KEY (`id`) REFERENCES `cliente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privato`
--

LOCK TABLES `privato` WRITE;
/*!40000 ALTER TABLE `privato` DISABLE KEYS */;
INSERT INTO `privato` VALUES (1,'Mario','Rossi','1968-11-10','123456789'),(2,'Pinco','Pallino','1989-04-20','246824682');
/*!40000 ALTER TABLE `privato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rata`
--

DROP TABLE IF EXISTS `rata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rata` (
  `cod_iscrizione` int(11) NOT NULL,
  `num_rata` int(11) NOT NULL,
  `importo` decimal(10,2) DEFAULT NULL,
  `data` date DEFAULT NULL,
  `metodo` varchar(45) DEFAULT NULL,
  `num_ricevuta` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`cod_iscrizione`,`num_rata`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rata`
--

LOCK TABLES `rata` WRITE;
/*!40000 ALTER TABLE `rata` DISABLE KEYS */;
INSERT INTO `rata` VALUES (1,1,100.00,'2017-02-14','Contanti','0001'),(1,2,200.00,'2017-03-17','Contanti','0002');
/*!40000 ALTER TABLE `rata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `societa`
--

DROP TABLE IF EXISTS `societa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `societa` (
  `id` int(11) NOT NULL,
  `rag_sociale` varchar(150) DEFAULT NULL,
  `rag_sociale2` varchar(150) DEFAULT NULL,
  `dvr` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_societa_cliente` FOREIGN KEY (`id`) REFERENCES `cliente` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `societa`
--

LOCK TABLES `societa` WRITE;
/*!40000 ALTER TABLE `societa` DISABLE KEYS */;
/*!40000 ALTER TABLE `societa` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-08-29 18:50:38
