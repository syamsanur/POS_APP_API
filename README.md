# POS_APP_API
Point Of Sales API is the api for Point Of Sales Application, this API is built like the MVC concept without the View part

![image](https://github.com/syamsanur/POS_APP_API/blob/master/arka_pos_app_api.png)

## Feature
- The database consist 5 main table which is users, product, category, history dan detail history, and 1 table view display product
- Pengguna dapat melakukan fungsi CRUD untuk setiap table, kecuali table detail history
- Users can perform CRUD function for all table, except detail history table
- The value of the detail history table will only be created when the user enters a new history, the detail history table can only be seen
- There is authentication and authorization for each user
- There are redis to speed up data requests
- Product can be included with the image
