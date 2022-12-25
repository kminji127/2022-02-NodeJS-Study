const mongoose = require("mongoose");

const connect = () => {
  // 개발 환경일 때만 콘솔을 통해 몽구스가 행성하는 쿼리 내용 확인
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  // 몽구스와 몽고디비 연결
  mongoose.connect(
    "mongodb://1914386:etoile127@127.0.0.1:27017/admin?authSource=admin&authMechanism=SCRAM-SHA-1",
    {
      dbname: "nodejs",
      useNewUrlParser: true,
    },
    (error) => {
      if (error) {
        console.log("mongoDB 연결 에러", error);
      } else {
        console.log("mongoDB 연결 성공");
      }
    }
  );
};

// 이벤트 리스너
mongoose.connection.on("error", (error) => {
  console.error("mongoDB 연결 에러", error);
});
mongoose.connection.on("disconnection", () => {
  console.error("mongoDB 연결이 끊겼습니다. 연결을 재시도합니다.");
  connect();
});

module.exports = connect;
