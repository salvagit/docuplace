--
-- MySQL 5.5.42
-- Thu, 21 Jan 2016 03:59:47 +0000
--

USE `heroku_b5392a2dc029bc8`;

CREATE TABLE `cheques` (
   `id` int(11) unsigned not null auto_increment,
   `entidad` varchar(191),
   `cliente` varchar(191),
   `importe` varchar(191),
   `persona` varchar(191),
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=3;

INSERT INTO `cheques` (`id`, `entidad`, `cliente`, `importe`, `persona`) VALUES ('2', 'name', 'name', 'name', 'name');

CREATE TABLE `cvn` (
   `id` int(11) unsigned not null auto_increment,
   `bla` varchar(255),
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=23;

INSERT INTO `cvn` (`id`, `bla`) VALUES ('12', 'asd');
INSERT INTO `cvn` (`id`, `bla`) VALUES ('22', 'xawawxwax');

CREATE TABLE `facturas` (
   `id` int(11) unsigned not null auto_increment,
   `monto` varchar(191),
   `cliente` varchar(191),
   `cuit` varchar(191),
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=243;

INSERT INTO `facturas` (`id`, `monto`, `cliente`, `cuit`) VALUES ('182', 'un monton', 'Pola', '123asdasd12');
INSERT INTO `facturas` (`id`, `monto`, `cliente`, `cuit`) VALUES ('192', 'asdasdasd', 'asdasdasd', 'asdasdasd');
INSERT INTO `facturas` (`id`, `monto`, `cliente`, `cuit`) VALUES ('202', 'qweqwe', 'qweqwe', 'cosas');
INSERT INTO `facturas` (`id`, `monto`, `cliente`, `cuit`) VALUES ('212', '1', 'pola', '3');
INSERT INTO `facturas` (`id`, `monto`, `cliente`, `cuit`) VALUES ('222', '1212', 'pola', '5');
INSERT INTO `facturas` (`id`, `monto`, `cliente`, `cuit`) VALUES ('232', 'un monton', 'Pola', '123asdasd1212');
INSERT INTO `facturas` (`id`, `monto`, `cliente`, `cuit`) VALUES ('242', 'Atque in qui sit anim similique dolor voluptas natus dolores nostrud', 'Repudiandae Nam adipisci provident aliquip lorem ad ut', 'Quis id perferendis numquam et nostrud temporibus');

CREATE TABLE `test` (
   `id` int(11) unsigned not null auto_increment,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=3;

INSERT INTO `test` (`id`) VALUES ('2');

CREATE TABLE `testut` (
   `id` int(11) unsigned not null auto_increment,
   `field1` varchar(191),
   `field2` varchar(191),
   `field3` varchar(191),
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=22;

INSERT INTO `testut` (`id`, `field1`, `field2`, `field3`) VALUES ('12', 'hola', 'CHICHE', 'hola');