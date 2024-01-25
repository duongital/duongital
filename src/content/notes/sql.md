# mysql

## install mysql

update os: `sudo apt update`

install: `sudo apt install mysql-server`

call app for 1st time: `sudo mysql`

check users: `SELECT user,authentication_string,plugin,host FROM mysql.user;`

change root password: `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '77889900';`

update all tables to take effects: `FLUSH PRIVILEGES;`

run mysql for next times: `mysql -u root -p`

check if mysql is running: `systemctl status mysql.service`

## remove mysql completely

sudo apt-get remove --purge mysql
sudo apt-get purge mysql
sudo apt-get autoremove
sudo apt-get autoclean
sudo apt-get remove dbconfig-mysql
sudo apt-get dist-upgrade

---

# sqlite

small version of sql

## installation

- install: `sudo apt install sqlite3`
- create database: `sqlite3 sharks.db`
- show all table: `.tables`
- show table info: `pragma table_info(tasks)`
- create table:
CREATE TABLE tasksf(id text NOT NULL, task text NOT NULL, done boolean NOT NULL);

---

# postgresql

- no password: `/etc/postgresql/12/main` and change file `sudo vim pg_hba.conf` to local > all > postgres > trust (from md5 or something)
- check available databases: `\l`
- connect to database `\c database_name`
- show tables `\dt`
- then: `select * from table_name`

## installation

`apt-get install postgresql-11`

## setup password for the very fist time

find the file in location: `cd /etc/postgresql/11/main`
edit the file: pg_hba.conf (local all postgres peer > trust)
restart the server: `sudo service postgresql restart`
login again: `psql -U postgres`
change password: `ALTER USER postgres with password 'your-pass'`
edit the file: pg_hba.conf (local all postgres trust > md5)
restart the server: `sudo service postgresql restart`

## backup database:

backup

`pg_dump -U postgres -O event_site > es.dump`

import

`psql -U username dbname < dbexport.pgsql`

## basic command

open postgresql: psql

sow all databases: `\d`

connect to a database: `\c mydbname`

show all tables: `\dt`

## create user name and password with full access

postgres=# `create database mydb;`

postgres=# `create user myuser with encrypted password ‘mypass’;`

postgres=# `grant all privileges on database mydb to myuser;`

## create/delete database:

create db: `create database your-db-name`

delete db: `drop database your-db-name`

## backup database

create file ./run and add exec role: `chmod +x run`

```bash
pg_dump -U postgres -O event_site > event_site.dump
pg_dump -U postgres -O q_test > q_test.dump
pg_dump -U postgres -O survey > survey.dump
```

---

# general 

simple knowledge

## rank, row_number, dense_rank

```sql
select
    Score as Score, 
    rank () OVER ( 
		ORDER BY Score DESC
	) 'Rank' 
from Scores
```

rank: trùng hạng thì trùng rank, có lủng số

row_number: trùng hạng khác số rank

dense_rank: trùng hạng thì trùng rank, k lủng số

## distinct, limit, offset

khi lấy distinct thì chỉ trả về những kết quả không trùng nhau, nếu row = 0 trả null

limit = 1: chỉ lấy hàng đầu tiên

litmit = 1, offset = 1: bỏ hàng đầu tiên, lấy một hàng duy nhất

```sql
SELECT DISTINCT
    Salary AS SecondHighestSalary
FROM
    Employee
ORDER BY Salary DESC
LIMIT 1 OFFSET 1
```

trong câu query không xử lý tính toán, muốn tính thì làm ở ngoài trước khi sử dụng (dùng trong function)

## select all

count all rows and setting the name of column is ALOHA

```sql
SELECT COUNT(*) AS ALOHA FROM STATION_DATA
WHERE TORNADO = 1;
```

## group by, order by

**GROUP BY** note: WHERE must be placed before GROUP BY

```sql
SELECT YEAR, COUNT(*) AS COUNT_YEAR FROM STATION_DATA
WHERE TORNADO = 1
GROUP BY YEAR;
```

ORDER BY can be placed after any WHERE and GROUP BY

```sql
SELECT YEAR, MONTH, COUNT(*) AS COUNT_YEAR FROM STATION_DATA
WHERE TORNADO = 1
GROUP BY 1, 2
ORDER BY year DESC, month
```

## aggregate function

aggregate function: SUM(), MIN(), MAX(), and AVG()

```sql
SELECT year,
SUM(snow_depth) as total_snow,
SUM(precipitation) as total_precipitation,
MAX(precipitation) as max_precipitation
FROM station_data
WHERE year >= 2000
GROUP BY year;
```

## count 

count using asterisk is different from using specific column name

```sql
SELECT COUNT(*) AS COUNT_ROWS FROM STATION_DATA; -- 28,000 results
SELECT COUNT(SNOW_DEPTH) AS COUNT_SNOW FROM STATION_DATA; -- 1,552 results (not count null)
```

because WHERE must be placed before GROUP BY, so we can't use aggregate functions to filter. the only way to use that is HAVING

```sql
SELECT year,
SUM(precipitation) as total_precipitation
FROM station_data
GROUP BY year
HAVING total_precipitation > 30
```

## get data not repeating 

to get data that not repeating using keyword DISTINCT

```sql
SELECT DISTINCT station_number FROM station_data;
```

## case 

CASE dùng để ánh xạ giá trị của cột đó thành một cột khác bằng điều kiện do mình đặt ra

```sql
SELECT report_code, year, month, day, wind_speed,

CASE
    WHEN wind_speed >= 40 THEN 'HIGH'
    WHEN wind_speed >= 30 AND wind_speed < 40 THEN 'MODERATE'
    ELSE 'LOW'
END as wind_severity

FROM station_data
```

một thế mạnh khác của CASE là dùng để gộp nhiều query vào một, hoặc thực hiện query phức tạp, ví dụ một lần gọi WHERE tornado =1 và thêm một lần WHERE tornado =0, thì làm như sau:

```sql
SELECT year,

MAX(CASE WHEN tornado = 0 THEN precipitation ELSE NULL END) as
    max_non_tornado_precipitation,

MAX(CASE WHEN tornado = 1 THEN precipitation ELSE NULL END) as
    max_tornado_precipitation

FROM station_data
GROUP BY year
```

nếu như một bảng gọi đến Id của bảng khác thì bảng này là bảng con, còn bảng giữ Id kia là bảng cha. ví dụ bảng customer_order có thông tin customer_id thì nó là con còn customer là cha

## relationship

có 3 loại quan hệ:

- one to many
- many to many
- one to one

QUAN HỆ 1-TO-MANY

- thường mối liên hệ giữa primary key và foreign key là 1-to-many (cha - to - con): nhiều con sẽ có một cha.
- nhớ cách đặt tên ở bảng con, mặc dù chung tên nhưng đặt sao có ý nghĩa, ví dụ: booked_company_id >> company_id để thể hiện phòng đã được đặt cho công ty nào
- hướng mũi tên: con —> cha (con đi tìm cha), sao datagrip nó vẽ ngược???

## join tables

**INNER JOIN**: khi 2 bảng có cùng một Id và dùng inner join thì nó chỉ lấy các cột mà có cùng Id share giữa 2 bên thôi, còn cái Id nào mà bên này có bên kia không thì nó sẽ không trả về

```sql
SELECT
    ORDER_ID,
    CUSTOMER.CUSTOMER_ID,
    ORDER_DATE,
    SHIP_DATE,
    NAME,
    STREET_ADDRESS,
    CITY,
    STATE,
    ZIP,
    PRODUCT_ID,
    ORDER_QTY

FROM CUSTOMER

INNER JOIN CUSTOMER_ORDER -- can swap these two table names
ON CUSTOMER.CUSTOMER_ID = CUSTOMER_ORDER.CUSTOMER_ID; -- shared key

-- if there are 2x relationships
SELECT
    ORDER_ID,
    CUSTOMER.CUSTOMER_ID,
    NAME AS CUSTOMER_NAME,
    STREET_ADDRESS,
    CITY,
    STATE,
    ZIP,
    ORDER_DATE,
    PRODUCT.PRODUCT_ID,
    DESCRIPTION,
    ORDER_QTY
FROM CUSTOMER

INNER JOIN CUSTOMER_ORDER
ON CUSTOMER_ORDER.CUSTOMER_ID = CUSTOMER.CUSTOMER_ID

INNER JOIN PRODUCT
ON CUSTOMER_ORDER.PRODUCT_ID = PRODUCT.PRODUCT_ID;
```

**JOIN**: khi 2 bảng có gì khác nhau cũng join, lấy hết 2 bên

**OUTER JOIN**: lấy phần ngoài của 2 bên k giao nhau

**LEFT JOIN**: lấy phần của bảng 1

**OUTER JOIN**: lấy phần của bảng 2

nếu dùng LEFT JOIN thì có thể bị null nên dùng hàm coalesce để convert về 0

```sql
SELECT
    CUSTOMER.CUSTOMER_ID,
    NAME AS CUSTOMER_NAME,
    coalesce(sum(ORDER_QTY * PRICE), 0) as TOTAL_REVENUE
FROM CUSTOMER
LEFT JOIN CUSTOMER_ORDER
ON CUSTOMER_ORDER.CUSTOMER_ID = CUSTOMER.CUSTOMER_ID
LEFT JOIN PRODUCT
ON CUSTOMER_ORDER.PRODUCT_ID = PRODUCT.PRODUCT_ID
GROUP BY 1;
```

---

# aws ec2 setup and config

## setup environment

Sercurity group MySQL/Aurora to all trafic

Open the file `sudo vim /etc/mysql/my.cnf`

In above file, see 2 files, open those 2 files and find `bind-address = 127.xxx.xx`

Change it into 0.0.0.0 and the restart the mysql service

## connect to AWS EC2 mysql using SSH

[https://s3-us-west-2.amazonaws.com/secure.notion-static.com/33762487-c093-4b7c-989c-ea2a8096f7c7/untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/33762487-c093-4b7c-989c-ea2a8096f7c7/untitled)

SSH key is the .pem file saved locally

## connect to AWS EC2 mysql using an previlege user

```sql
-- this block for reference only
CREATE USER 'duongital'@'localhost' IDENTIFIED BY '77889900';
GRANT ALL PRIVILEGES ON *.* TO 'duongital'@'localhost' WITH GRANT OPTION;
CREATE USER 'duongital'@'%' IDENTIFIED BY '77889900';
GRANT ALL PRIVILEGES ON *.* TO 'duongital'@'%' WITH GRANT OPTION;
```

```sql
-- use this block of code, create user with all privileges
CREATE USER 'duongital'@'%' IDENTIFIED BY '77889900';
GRANT ALL PRIVILEGES ON testdb.* To 'duongital'@'%' IDENTIFIED BY '77889900';
FLUSH PRIVILEGES;
```

exit out and restart sql: `sudo service mysql restart`

---


