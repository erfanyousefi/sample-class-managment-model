const {Sequelize, DataTypes} = require("sequelize");


const sequelize = new Sequelize("class_management", "root", "password", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // اختیاری
});


const User = sequelize.define("User", {
  name: {type: DataTypes.STRING, allowNull: false},
  email: {type: DataTypes.STRING, allowNull: false, unique: true},
  role: {
    type: DataTypes.ENUM("student", "teacher", "admin"),
    allowNull: false,
  },
});


const Course = sequelize.define("Course", {
  title: {type: DataTypes.STRING, allowNull: false},
  description: {type: DataTypes.TEXT, allowNull: true},
  teacherId: {type: DataTypes.INTEGER, allowNull: false},
});


const Session = sequelize.define("Session", {
  courseId: {type: DataTypes.INTEGER, allowNull: false},
  date: {type: DataTypes.DATE, allowNull: false},
});


const Enrollment = sequelize.define("Enrollment", {
  userId: {type: DataTypes.INTEGER, allowNull: false},
  courseId: {type: DataTypes.INTEGER, allowNull: false},
  status: {
    type: DataTypes.ENUM("pending", "accepted", "rejected"),
    allowNull: false,
    defaultValue: "pending",
  },
});


const Attendance = sequelize.define("Attendance", {
  enrollmentId: {type: DataTypes.INTEGER, allowNull: false},
  sessionId: {type: DataTypes.INTEGER, allowNull: false},
  present: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
});


const Payment = sequelize.define("Payment", {
  userId: {type: DataTypes.INTEGER, allowNull: false},
  courseId: {type: DataTypes.INTEGER, allowNull: false},
  amount: {type: DataTypes.INTEGER, allowNull: false},
  status: {
    type: DataTypes.ENUM("pending", "paid", "failed"),
    allowNull: false,
    defaultValue: "pending",
  },
});

User.hasMany(Course, {foreignKey: "teacherId", as: "courses"});
Course.belongsTo(User, {foreignKey: "teacherId", as: "teacher"});

Course.hasMany(Session, {foreignKey: "courseId"});
Session.belongsTo(Course, {foreignKey: "courseId"});

User.hasMany(Enrollment, {foreignKey: "userId"});
Enrollment.belongsTo(User, {foreignKey: "userId"});

Course.hasMany(Enrollment, {foreignKey: "courseId"});
Enrollment.belongsTo(Course, {foreignKey: "courseId"});

Enrollment.hasMany(Attendance, {foreignKey: "enrollmentId"});
Attendance.belongsTo(Enrollment, {foreignKey: "enrollmentId"});

Session.hasMany(Attendance, {foreignKey: "sessionId"});
Attendance.belongsTo(Session, {foreignKey: "sessionId"});

User.hasMany(Payment, {foreignKey: "userId"});
Payment.belongsTo(User, {foreignKey: "userId"});

Course.hasMany(Payment, {foreignKey: "courseId"});
Payment.belongsTo(Course, {foreignKey: "courseId"});

module.exports = {
  sequelize,
  User,
  Course,
  Session,
  Enrollment,
  Attendance,
  Payment,
};
