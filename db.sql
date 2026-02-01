-- foodops.address definition

CREATE TABLE `address` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `postal_code` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `street_address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- foodops.coupon definition

CREATE TABLE `coupon` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `discount_amount` double NOT NULL,
  `terms_and_conditions` varchar(255) DEFAULT NULL,
  `validity_period` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- foodops.events_seq definition

CREATE TABLE `events_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- foodops.ingredient_category_seq definition

CREATE TABLE `ingredient_category_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- foodops.ingredients_item_seq definition

CREATE TABLE `ingredients_item_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- foodops.payment definition

CREATE TABLE `payment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `order_id` bigint DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `payment_status` varchar(255) DEFAULT NULL,
  `total_amount` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- foodops.`user` definition

CREATE TABLE `user` (
  `id` bigint NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` tinyint DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `user_chk_1` CHECK ((`role` between 0 and 3))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- foodops.user_seq definition

CREATE TABLE `user_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- foodops.cart definition

CREATE TABLE `cart` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `total` bigint DEFAULT NULL,
  `customer_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK867x3yysb1f3jk41cv3vsoejj` (`customer_id`),
  CONSTRAINT `FK9mocisyryuqas1xrlbl8872lb` FOREIGN KEY (`customer_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- foodops.password_reset_token definition

CREATE TABLE `password_reset_token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `expiry_date` datetime(6) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5lwtbncug84d4ero33v3cfxvl` (`user_id`),
  CONSTRAINT `FK5lwtbncug84d4ero33v3cfxvl` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- foodops.restaurant definition

CREATE TABLE `restaurant` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `cuisine_type` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `num_rating` int NOT NULL,
  `open` bit(1) NOT NULL,
  `opening_hours` varchar(255) DEFAULT NULL,
  `registration_date` datetime(6) DEFAULT NULL,
  `address_id` bigint DEFAULT NULL,
  `owner_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKe5wptm5diypt91i1wpsa42h6x` (`owner_id`),
  KEY `FK96q13p1ptpewvus590a8o83xt` (`address_id`),
  CONSTRAINT `FK96q13p1ptpewvus590a8o83xt` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`),
  CONSTRAINT `FKnm7kj0jgjep1nm5rslxei79jl` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- foodops.restaurant_images definition

CREATE TABLE `restaurant_images` (
  `restaurant_id` bigint NOT NULL,
  `images` varchar(1000) DEFAULT NULL,
  KEY `FK810i11orew47qx1nrcwlh43jb` (`restaurant_id`),
  CONSTRAINT `FK810i11orew47qx1nrcwlh43jb` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- foodops.review definition

CREATE TABLE `review` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `rating` double NOT NULL,
  `customer_id` bigint DEFAULT NULL,
  `restaurant_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKrrkqlt8co52qjdj34nqv97xn4` (`customer_id`),
  KEY `FK70ry7cuti298yxet366rynxch` (`restaurant_id`),
  CONSTRAINT `FK70ry7cuti298yxet366rynxch` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`),
  CONSTRAINT `FKrrkqlt8co52qjdj34nqv97xn4` FOREIGN KEY (`customer_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- foodops.user_addresses definition

CREATE TABLE `user_addresses` (
  `user_id` bigint NOT NULL,
  `addresses_id` bigint NOT NULL,
  UNIQUE KEY `UKi5lp1fvgfvsplfqwu4ovwpnxs` (`addresses_id`),
  KEY `FKfm6x520mag23hvgr1oshaut8b` (`user_id`),
  CONSTRAINT `FKfm6x520mag23hvgr1oshaut8b` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKth1icmttmhhorb9wiarm73i06` FOREIGN KEY (`addresses_id`) REFERENCES `address` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- foodops.user_favorites definition

CREATE TABLE `user_favorites` (
  `user_id` bigint NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `id` bigint DEFAULT NULL,
  `images` varbinary(1000) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  KEY `FK848qdyqh37xmekek29npyyjuo` (`user_id`),
  CONSTRAINT `FK848qdyqh37xmekek29npyyjuo` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- foodops.category definition

CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `restaurant_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKp6n44aqw5n74qc4f1d6eyqgha` (`restaurant_id`),
  CONSTRAINT `FKp6n44aqw5n74qc4f1d6eyqgha` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- foodops.events definition

CREATE TABLE `events` (
  `id` bigint NOT NULL,
  `ends_at` varchar(255) DEFAULT NULL,
  `image` text,
  `location` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `started_at` varchar(255) DEFAULT NULL,
  `restaurant_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdu9w0l07t470p611xhr92l0f2` (`restaurant_id`),
  CONSTRAINT `FKdu9w0l07t470p611xhr92l0f2` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- foodops.food definition

CREATE TABLE `food` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `available` bit(1) NOT NULL,
  `creation_date` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_seasonal` bit(1) NOT NULL,
  `is_vegetarian` bit(1) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` bigint DEFAULT NULL,
  `food_category_id` bigint DEFAULT NULL,
  `restaurant_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKd5jb57wcj3nomso10nhrit3dc` (`food_category_id`),
  KEY `FKm9xrxt95wwp1r2s7andom1l1c` (`restaurant_id`),
  CONSTRAINT `FKd5jb57wcj3nomso10nhrit3dc` FOREIGN KEY (`food_category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `FKm9xrxt95wwp1r2s7andom1l1c` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- foodops.food_images definition

CREATE TABLE `food_images` (
  `food_id` bigint NOT NULL,
  `images` varchar(1000) DEFAULT NULL,
  KEY `FKjjjt9373et45vaj0mguo4pd2p` (`food_id`),
  CONSTRAINT `FKjjjt9373et45vaj0mguo4pd2p` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- foodops.ingredient_category definition

CREATE TABLE `ingredient_category` (
  `id` bigint NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `restaurant_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdx2hvej3t5hkiguy698n9covv` (`restaurant_id`),
  CONSTRAINT `FKdx2hvej3t5hkiguy698n9covv` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- foodops.ingredients_item definition

CREATE TABLE `ingredients_item` (
  `id` bigint NOT NULL,
  `in_stoke` bit(1) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  `restaurant_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjb94f4rm414htlxd1mwhf56in` (`category_id`),
  KEY `FKkokfv1la8uvwmow57uv6aeqnx` (`restaurant_id`),
  CONSTRAINT `FKjb94f4rm414htlxd1mwhf56in` FOREIGN KEY (`category_id`) REFERENCES `ingredient_category` (`id`),
  CONSTRAINT `FKkokfv1la8uvwmow57uv6aeqnx` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- foodops.notification definition

CREATE TABLE `notification` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `message` varchar(255) DEFAULT NULL,
  `read_status` bit(1) NOT NULL,
  `sent_at` datetime(6) DEFAULT NULL,
  `recipient_id` bigint DEFAULT NULL,
  `restaurant_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqnduwq6ix2pxx1add03905i1i` (`recipient_id`),
  KEY `FKko0pfhpsis62gs8e88dhh7knf` (`restaurant_id`),
  CONSTRAINT `FKko0pfhpsis62gs8e88dhh7knf` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`),
  CONSTRAINT `FKqnduwq6ix2pxx1add03905i1i` FOREIGN KEY (`recipient_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- foodops.order_item definition

CREATE TABLE `order_item` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ingredients` varbinary(255) DEFAULT NULL,
  `quantity` int NOT NULL,
  `total_price` bigint DEFAULT NULL,
  `food_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4fcv9bk14o2k04wghr09jmy3b` (`food_id`),
  CONSTRAINT `FK4fcv9bk14o2k04wghr09jmy3b` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- foodops.orders definition

CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `order_status` varchar(255) DEFAULT NULL,
  `total_amount` bigint DEFAULT NULL,
  `total_item` int NOT NULL,
  `total_price` int NOT NULL,
  `customer_id` bigint DEFAULT NULL,
  `delivery_address_id` bigint DEFAULT NULL,
  `payment_id` bigint DEFAULT NULL,
  `restaurant_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKhaujdjk1ohmeixjhnhslchrp1` (`payment_id`),
  KEY `FK14n2jkmoyhpimhracvcdy7sst` (`customer_id`),
  KEY `FKbwhiubtkxf94knbm9oo55wdbm` (`delivery_address_id`),
  KEY `FKi7hgjxhw21nei3xgpe4nnpenh` (`restaurant_id`),
  CONSTRAINT `FK14n2jkmoyhpimhracvcdy7sst` FOREIGN KEY (`customer_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKag8ppnkjvx255gj7lm3m18wkj` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`id`),
  CONSTRAINT `FKbwhiubtkxf94knbm9oo55wdbm` FOREIGN KEY (`delivery_address_id`) REFERENCES `address` (`id`),
  CONSTRAINT `FKi7hgjxhw21nei3xgpe4nnpenh` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- foodops.orders_items definition

CREATE TABLE `orders_items` (
  `order_id` bigint NOT NULL,
  `items_id` bigint NOT NULL,
  UNIQUE KEY `UK7qrg5pfgjon82yhgwfqrdijm5` (`items_id`),
  KEY `FKij1wwgx6o198ubsx1oulpopem` (`order_id`),
  CONSTRAINT `FKij1wwgx6o198ubsx1oulpopem` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `FKl3w3fx5rbjq0tbb2i0xidwabh` FOREIGN KEY (`items_id`) REFERENCES `order_item` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- foodops.cart_item definition

CREATE TABLE `cart_item` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ingredients` varbinary(255) DEFAULT NULL,
  `quantity` int NOT NULL,
  `total_price` bigint DEFAULT NULL,
  `cart_id` bigint DEFAULT NULL,
  `food_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1uobyhgl1wvgt1jpccia8xxs3` (`cart_id`),
  KEY `FKcro8349ry4i72h81en8iw202g` (`food_id`),
  CONSTRAINT `FK1uobyhgl1wvgt1jpccia8xxs3` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`),
  CONSTRAINT `FKcro8349ry4i72h81en8iw202g` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- foodops.food_ingredients definition

CREATE TABLE `food_ingredients` (
  `food_id` bigint NOT NULL,
  `ingredients_id` bigint NOT NULL,
  KEY `FKhy3t7b303ydmureccjf1qak2k` (`ingredients_id`),
  KEY `FKnfwd9dp2aw8o8l4ftu39jmvv9` (`food_id`),
  CONSTRAINT `FKhy3t7b303ydmureccjf1qak2k` FOREIGN KEY (`ingredients_id`) REFERENCES `ingredients_item` (`id`),
  CONSTRAINT `FKnfwd9dp2aw8o8l4ftu39jmvv9` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;