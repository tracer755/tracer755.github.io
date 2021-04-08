CREATE TABLE `LoginSystemDB` (
`id` INT( 10 ) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`name` VARCHAR( 30 ) NOT NULL ,
`email` VARCHAR( 20 ) NOT NULL,
`password` VARCHAR( 50 ) NOT NULL,
`score` INT( 11 )NOT NULL,
`IP` VARCHAR( 20 ) NOT NULL,
`status` INT( 3 )NOT NULL
) ENGINE = innodb;

