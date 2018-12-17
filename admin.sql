-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 15, 2018 at 10:01 AM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 5.6.37

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";
SET SQL_MODE='ALLOW_INVALID_DATES';

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `niksms`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

SET GLOBAL pxc_strict_mode=PERMISSIVE;

-- CREATE TABLE `admin` (
--   `admin_id` int(9) NOT NULL,
--   `status` int(1) NOT NULL DEFAULT '1',
--   `full_name` varchar(255) NOT NULL,
--   `email` varchar(255) NOT NULL,
--   `date_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   `createdby` int(9) NOT NULL DEFAULT '0',
--   `adminname` varchar(255) NOT NULL,
--   `password` varchar(500) NOT NULL,
--   `password_token` varchar(500) NOT NULL,
--   `token_time` timestampSET SQL_MODE='ALLOW_INVALID_DATES'; NOT NULL DEFAULT '0000-00-00 00:00:00',
--   `admin_ip` varchar(255) NOT NULL,
--   `mydp` varchar(250) NOT NULL
-- ) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE `users` (
`id` int(9) NOT NULL AUTO_INCREMENT,
`email` varchar(255) NOT NULL,
`full_name` varchar(255) NOT NULL,
`name` varchar(255) NOT NULL,
`password` varchar(500) NOT NULL,
`password_token` varchar(500) NOT NULL,
`token_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
`mydp` varchar(250) NOT NULL,
`admin_ip` varchar(255) NOT NULL,
`userType` varchar(255) NOT NULL,
primary key (id)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `status`, `full_name`, `email`, `date_time`, `createdby`, `adminname`, `password`, `password_token`, `token_time`, `admin_ip`, `mydp`) VALUES
(1, 1, 'parag', 'aakashpaliwal@gmail.com', '2018-09-04 08:05:26', 1, 'aakash', 'e7b0ab597644579afe2bd0c5194a76f707b2bcbf2015c6abbbbc65cfa2dfe73e', '', '0000-00-00 00:00:00', '', ''),
(2, 0, 'paragdineshgupta', 'aakash@gmail.com', '2018-09-21 06:54:36', 0, 'gupta', '46011b5aab12a95bc104e3c7abc184e2d9e0bc7994159ef9b337d781db97cce0', '', '0000-00-00 00:00:00', '', 'parag.jpg'),
(3, 1, 'parag', '', '2018-09-22 10:00:13', 2, 'divana', '85b2ab7fc2fa0ab39c66c05eadffbad5cd3d47a6cdc761ad41b7cb84b9a4b251', '', '0000-00-00 00:00:00', '', ''),
(4, 0, 'harold', '', '2018-10-24 11:28:25', 1, 'harold404', '46011b5aab12a95bc104e3c7abc184e2d9e0bc7994159ef9b337d781db97cce0', '', '0000-00-00 00:00:00', '', ''),
(5, 0, 'john doe', '', '2018-10-24 16:46:46', 1, 'john222', '2c84d2f42531a8305ce8a746941758d4c92387c49367f4ada1cb57654fe8209f', '', '0000-00-00 00:00:00', '', ''),
(6, 1, 'root', 'aakashpaliwal95@gmail.com', '2018-10-25 05:26:12', 1, '', '7933c1fad5d408559ee9cb83f2fcaab69f9c99b51af603c5255f8311f2902268', '', '0000-00-00 00:00:00', '', ''),
(7, 0, 'jane test', '', '2018-10-25 05:26:24', 1, 'jane2222', '0f7259d6e57ddf061913a9e271a8577b94d56ed93aa0700468e4f6b977150589', '', '0000-00-00 00:00:00', '', ''),
(8, 1, 'parag', 'parag@gmail.com', '2018-10-25 05:27:09', 1, '', '46011b5aab12a95bc104e3c7abc184e2d9e0bc7994159ef9b337d781db97cce0', '', '0000-00-00 00:00:00', '', ''),
(9, 1, 'rohit', '', '2018-10-30 05:31:12', 1, '', '46011b5aab12a95bc104e3c7abc184e2d9e0bc7994159ef9b337d781db97cce0', '', '0000-00-00 00:00:00', '', ''),
(10, 1, 'albert', 'alberte45@gmail.com', '2018-11-02 11:11:53', 1, 'albert23', '46011b5aab12a95bc104e3c7abc184e2d9e0bc7994159ef9b337d781db97cce0', '', '0000-00-00 00:00:00', '', ''),
(11, 0, 'test john ', 'testjohn@gmail.com', '2018-11-03 12:41:24', 1, 'test jogn23', 'e7b0ab597644579afe2bd0c5194a76f707b2bcbf2015c6abbbbc65cfa2dfe73e', '', '0000-00-00 00:00:00', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`),
  ADD KEY `admin_fk0` (`createdby`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;





CREATE TABLE `users` (
`id` int(9) NOT NULL AUTO_INCREMENT,
`email` varchar(255) NOT NULL,
`full_name` varchar(255) NOT NULL,
`name` varchar(255) NOT NULL,
`password` varchar(500) NOT NULL,
`password_token` varchar(500) NOT NULL,
`token_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
`mydp` varchar(250) NOT NULL,
`admin_ip` varchar(255) NOT NULL,
primary key (id)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



SET SQL_MODE='ALLOW_INVALID_DATES';



CREATE TABLE `orders` (
`id` int(9) NOT NULL AUTO_INCREMENT,
`status` varchar(255) NOT NULL,
`requirement` varchar(2000) NOT NULL,
`email` varchar(255) NOT NULL,
`site_id` varchar(500) NOT NULL,
`time` timestamp NOT NULL DEFAULT '1970-02-01 00:00:01',
primary key (id)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE `pendingNegotiate` (
`id` int(9) NOT NULL AUTO_INCREMENT,
`orderid` int(9) NOT NULL,
`email` varchar(255) NOT NULL,
`cost` int(9) NOT NULL,
`status` varchar(255) NOT NULL,
`time` timestamp NOT NULL DEFAULT '1970-02-01 00:00:01',
primary key (id)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



CREATE TABLE `sites` (
`id` int(9) NOT NULL AUTO_INCREMENT,
`email` varchar(255) NOT NULL,
`address` varchar(2500) NOT NULL,
`time` timestamp NOT NULL DEFAULT '1970-02-01 00:00:01',
primary key (id)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


CREATE TABLE `supplierdriver` (
`id` int(9) NOT NULL AUTO_INCREMENT,
`driveremail` varchar(255) NOT NULL,
`supplieremail` varchar(250) NOT NULL,
primary key (id)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE `runningDriver` (
`id` int(9) NOT NULL AUTO_INCREMENT,
`orderid` int(9) NOT NULL,
`driveremail` varchar(255) NOT NULL,
`supplieremail` varchar(250) NOT NULL,
`buyeremail` varchar(250) NOT NULL,
`time` timestamp NOT NULL DEFAULT '1970-02-01 00:00:01',
`status` varchar(255) NOT NULL,
primary key (id)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



CREATE TABLE `qr` (
`id` int(9) NOT NULL AUTO_INCREMENT,
`orderid` int(9) NOT NULL,
`hash` varchar(255) NOT NULL,
`status` varchar(250) NOT NULL,
primary key (id)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;