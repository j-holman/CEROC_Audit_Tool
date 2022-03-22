
// // //For local database
// module.exports = {
//     HOST: "localhost",
//     USER: "root",
//     PASSWORD: "Testpass123!",
//     DB: "testdb",
//     dialect: "mysql"
//     // pool: { //For Sequelize connection pool config
//     //   max: 5, //Max # of connections in pool
//     //   min: 0, //Min # of connections in pool
//     //   acquire: 30000, //Max time(ms) that pool tries to get connection before error
//     //   idle: 10000 //Min time(ms) that pool tries to get connection before error
//     // }
// };

//C:\Users\mymuf\Documents\ceroc-audit-tool\cyber-audit-server\app\config

//For cloud database
module.exports = {
    HOST: "127.0.0.1",
    USER: "root",
    PASSWORD: "root",
    DB: "CEROCAT_DB",
    dialect: "mysql"
    // pool: { //For Sequelize connection pool config
    //   max: 5, //Max # of connections in pool
    //   min: 0, //Min # of connections in pool
    //   acquire: 30000, //Max time(ms) that pool tries to get connection before error
    //   idle: 10000 //Min time(ms) that pool tries to get connection before error
    // }
};