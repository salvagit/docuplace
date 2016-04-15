# Docuplace

generate config file
╰─$ cp config/environment.php.example config/environment.php         

add this line to apache vhost config:
php_value  auto_prepend_file "<docuplace_home>/config/environment.php"

replace <DB_XXXX> with your data.
