const usersModel = {
    getAll:
    `SELECT
    *
    FROM 
    users`,

    getByID:
    `SELECT 
    * 
    FROM 
    users 
    WHERE 
    id = ?`,

    addUser:
    `INSERT 
    INTO 
    users(username,
        email,password,
        name,
        lastname,
        phone_number,
        role_id,is_active)
        VALUES(?,?,?,?,?,?,?,?)`,

    getBYUserame:
    `Select
    id
    FROM
    Users
    WHERE username = ?`,

    getBYEmail:
    `Select
    id
    FROM
    Users
    WHERE email = ?`,

    updateRow:
    `UPDATE users SET username = ? WHERE id = ?`
    ,

    deleteRow:
    `UPDATE
        users
    SET 
        is_active = 0
    WHERE 
        id = ?`

   
        
    

}


module.exports = usersModel;