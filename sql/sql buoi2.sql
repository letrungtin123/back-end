create database Project
use Project
create table Products (
name nvarchar(50),
image varchar(100),
price float,
descrip nvarchar(50),
)
create table Category (
name_cate nvarchar(100),
image varchar(200)
)
-- add
insert into Products (name,image,price,descrip)
values 
(N'Jordan','img1','10000','new'),
(N'Nike','img2','13000','new'),
(N'Balenciaga','img3','26000','new'),
(N'Gucci','img4','40000','new'),
(N'Dior','img5','35000','new'),
(N'LouisVuiiton','img6','60000','new')

insert into Category (name_cate,image)
values 
(N'danh muc 1','imge1'),
(N'danh muc 2','imge2'),
(N'danh muc 3','imge3'),
(N'danh muc 4','imge4'),
(N'danh muc 5','imge5'),
(N'danh muc 6','imge6'),
(N'danh muc 6','imge6')

-- get all
select * from Category 
select * from Products
--get one
select * from Category
where name_cate = N'danh muc 1'
select * from Category
where image = 'imge1'
select * from Products
where name = 'Jordan'
select * from Products
where price = '40000'
select * from Products
where image = 'img6'
select * from Products
where descrip = 'new'
 --update
 update Category
 set name_cate = N'danh muc update'
 where name_cate= N'danh muc 2'
 update Products
 set descrip = N'brand new'
 where descrip= N'new'