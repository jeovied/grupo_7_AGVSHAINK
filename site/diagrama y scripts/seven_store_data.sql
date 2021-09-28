CREATE DATABASE  IF NOT EXISTS `seven_store` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `seven_store`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: seven_store
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Nike'),(2,'Puma'),(3,'Adidas'),(4,'Umbro'),(5,'Fila'),(6,'Reebok'),(7,'Topper'),(8,'Converse'),(9,'Pony'),(10,'Crocs');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Zapatillas'),(2,'Ojotas'),(3,'Deportivo');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (16,'images-1632700772056.jpg',10),(17,'images-1632700772058.jpg',10),(18,'images-1632700772059.jpg',10),(19,'images-1632791005307.jpg',11),(20,'images-1632791005308.jpg',11),(21,'images-1632791005291.jpg',11),(22,'images-1632791612784.jpg',12),(23,'images-1632791612785.jpg',12),(24,'images-1632791612786.jpg',12),(25,'images-1632791672101.jpg',13),(26,'images-1632791672102.jpg',13),(27,'images-1632791672103.jpg',13),(28,'images-1632791790623.jpg',14),(29,'images-1632791790623.jpg',14),(30,'images-1632791790624.jpg',14),(31,'images-1632791997418.jpg',15),(32,'images-1632791997445.jpg',15),(33,'images-1632791997446.jpg',15),(34,'images-1632792041302.jpg',16),(35,'images-1632792041302.jpg',16),(36,'images-1632792041303.jpg',16),(37,'images-1632792193148.jpg',17),(38,'images-1632792193149.jpg',17),(39,'images-1632792193149.jpg',17),(40,'images-1632792269615.jpg',18),(41,'images-1632792269617.jpg',18),(42,'images-1632792269618.jpg',18),(43,'images-1632792343323.jpg',19),(44,'images-1632792343325.jpg',19),(45,'images-1632792343326.jpg',19);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `product_size`
--

LOCK TABLES `product_size` WRITE;
/*!40000 ALTER TABLE `product_size` DISABLE KEYS */;
INSERT INTO `product_size` VALUES (12,12,2),(13,12,1),(14,12,4),(15,13,1),(16,13,2),(17,13,3),(18,13,4),(19,14,2),(20,14,4),(21,15,1),(22,15,3),(23,16,1),(24,16,3),(25,17,1),(26,17,3);
/*!40000 ALTER TABLE `product_size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (10,'Bolso Nike Brasilia S',6499,'- Amplio compartimiento principal con pequeño bolsillo interno con cierre.\r\n- Compartimiento inferior con cierre.\r\n- Bolsillo frontal con cierre.\r\n- Bolsillo lateral derecho con cierre.\r\n- Bolsillo lateral izquierdo de red.\r\n- Tira con ajuste regulable.\r\n- Capacidad 41L.\r\n- Logo NIKE estampado.\r\n- Material: 100% Poliéster\r\n\r\nDimensiones aproximadas\r\nLargo: 51 cm.\r\nAncho: 26 cm.\r\nAlto: 26 cm.','masculino',3,1),(11,'Bolso Reebok Active Core Grip 49L',4499,'BOLSO DEPORTIVO MEDIANO ACTIVE CORE GRIP\r\nUN BOLSO DEPORTIVO CON BOLSILLO LATERAL\r\nOrganizá todo lo que necesites para asistir a ese torneo de verano en este versátil bolso deportivo. Tiene un bolsillo lateral para que tu merienda esté al alcance. Con un compartimento principal de fácil acceso y con cierre.\r\n\r\n- 100% poliéster reciclado\r\n- Dimensiones: 27 cm x 57 cm x 27 cm; 49 L\r\n- Bolsillo lateral\r\n- Compartimento principal con cierre\r\n- Correa acolchada para el hombro y manijas','masculino',3,6),(12,'Botines adidas Predator Freak .3 FG de Hombre',11999,'TACOS DE APOYO PARA EL JUEGO DE JEFES EN TERRENO FIRME.\r\n\r\n-Ajuste regular\r\n-Cierre de cordones\r\n-Parte superior de tejido revestido\r\n-Zona de impacto de impresión 3D a escala demoníaca\r\n-Suela para suelo firme','masculino',3,3),(13,'Zapatillas Fila Racer Flexion de Hombre',6990,'Producto inspirado en el Fila Racer Carbon.\r\n-Entresuela con diseño característico de la familia RACE , con tampografía en la región media.\r\n-Capellada confeccionada en Mesh respirable.\r\n-Modelo muy flexible y versatil.\r\n-Pisada Neutra.','masculino',1,5),(14,'Zapatillas Puma Aviator De Hombre',11999,'Estas zapatillas de running tienen características que no encontrarás en otros calzados de este tipo.\r\nPosee tecnología Foamlite, es una plantilla de espuma de memoria mejorada para mayor comodidad, a cada paso.\r\nCombinando esta amortiguación con las características de biomecánica de una sólida suela exterior y una talonera independiente, obtendrás el rendimiento de alto nivel que necesitas.\r\n\r\n- Capellada: Textil, Poliéster\r\n- Forro: Textil, Poliéster\r\n- Suela: Caucho','masculino',1,2),(15,'Zuecos Crocs Crocband de Mujer',5800,'-Estilo vintage y comodidad clásica de crocs.\r\n-Este ligero zueco crocband ™ posee correa en el talón que se mueve hacia atrás o adelante para un ajuste cómodo.\r\n-Tecnología croslite, material aplicado en la capellada y en la suela de este calzado crocs.\r\n-Liviano, resistente al desgaste con el suelo, buena amortiguación y elasticidad, no absorbe olores ni bacterias.','femenino',2,10),(16,'Zapatillas Topper Strong Pace 3 de Mujer',6399,'Exterior de mesh y suela de goma de perfecta amortiguación te brindan estilo, comodidad y resistencia en un solo calzado.\r\nIdeal para entrenamientos cómodos, su diseño minimalista y la tecnología Skinnect te aporta el estilo y liviandad que necesitás.\r\n-Material: Mix de materiales low.\r\n-Beneficios: Flexibilidad.\r\n-Composición: Capellada: Sintetico y Mesh / Suela: Goma.\r\n-Caña: Baja.\r\n-Ajuste: Con Cordones.','femenino',1,7),(17,'Zapatillas Nike Downshifter 11 de Mujer',11999,'Las Nike Downshifter 11 ofrecen una sujeción ligera y flexible para que nada te detenga. Incorporan la misma amortiguación suave de la última versión, y añaden más soporte alrededor del medio pie para ofrecer comodidad después del entrenamiento.\r\n\r\n-Una sujeción que se ve\r\n\r\n-Comodidad y amortiguación\r\n\r\n-Durabilidad y flexibilidad','femenino',1,1),(18,'Bolso adidas Brilliant Basic 39L',5999,'UN BOLSO DEPORTIVO PARA LOS DÍAS DE GIMNASIO\r\n\r\n- Dimensiones: 56 cm x 28 cm x 22 cm\r\n- Capacidad: 39 litros\r\n- Tejido de sarga 100 % algodón\r\n- Maleta deportiva informal\r\n- Bolsillos con cierre en los extremos\r\n- Correa acolchada ajustable para el hombro\r\n- Dos asas de mano\r\n- Base con revestimiento resistente de TPE\r\n- Color del artículo: Naranja Opaco','femenino',3,3),(19,'Bolso adidas 3 Tiras 25L',4499,'UN BOLSO DEPORTIVO PEQUEÑO PARA TENER TU ROPA PARA ENTRENAR SIEMPRE A LA MANO\r\n\r\n- Dimensiones: 45,5 cm x 23 cm x 20 cm\r\n- Capacidad: 25 litros\r\n- Tejido plano 100 % poliéster reciclado\r\n- Maleta deportiva con correa para el hombro\r\n- Bolsillo con cierre y bolsillos laterales de malla\r\n- Correa acolchada ajustable para el hombro\r\n- Asas de mano con agarre acolchado\r\n- Base con revestimiento resistente de TPE','femenino',3,3);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `sizes`
--

LOCK TABLES `sizes` WRITE;
/*!40000 ALTER TABLE `sizes` DISABLE KEYS */;
INSERT INTO `sizes` VALUES (1,38),(2,42),(3,36),(4,44);
/*!40000 ALTER TABLE `sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'Jona','Oviedo','jona19_92@hotmail.com','$2a$10$AnT2CixX6jXVXH9Qg0tnie6J9zPio5x9SyqnohVE./zgkrsiH2i5m',1140893426,'default-avatar.jpg','admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-27 23:12:48
