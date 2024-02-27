import "moment-timezone";
import * as jose from "jose";
import moment from "moment";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { TokenInfo, UserData } from "@/app/auth/type";
import { connectToDatabase } from "@/utils/db";
import { verify } from "@/utils/jwt";

import { Params } from "./utils";

const DELETE = async (
  req: Request,
  { params }: { params: Params }
) => {
  // 헤더 설정
  const new_headers = new Headers();
  new_headers.append("Content-Type", "application/json; charset=utf-8");
  
  // Authorization 헤더 확인
  const authorization = headers().get("authorization");
  const accessToken = authorization?.split(" ")[1] || "";
  const verified = await verify(accessToken);
  const decrypt = jose.decodeJwt(accessToken) as TokenInfo;
  if(!verified.ok) return new NextResponse(JSON.stringify({
    message: "로그인이 필요합니다.",
  }), {
    status: 401,
    headers: new_headers
  });

  const client = await connectToDatabase();
  const machineCollection = client.db().collection("machine");
  const query = { type: params.type, date: moment().tz("Asia/Seoul").format("YYYY-MM-DD"), owner: verified.userId };
  const result = await machineCollection.deleteOne(query);

  if(!result.acknowledged) return new NextResponse(JSON.stringify({
    success: false,
    message: "예약된 시간이 없습니다.",
  }), {
    status: 500,
    headers: new_headers
  });

  return new NextResponse(JSON.stringify({
    success: true,
    message: "예약이 취소되었습니다.",
  }), {
    status: 200,
    headers: new_headers
  });
};

export default DELETE;