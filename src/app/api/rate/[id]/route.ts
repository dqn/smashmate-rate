import { NextResponse } from "next/server";

type Params = {
  id: string;
};

export async function GET(_: Request, { params }: { params: Params }) {
  const res = await fetch(`https://smashmate.net/user/${params.id}/`, {
    cache: "no-store",
  });
  const text = await res.text();

  const matches = text.match(/<span class="rate_text">.+?(\d{4}).+?<span/s);

  if (matches === null) {
    throw new Error("invalid id");
  }

  const rate = Number(matches[1]);

  return NextResponse.json({ rate });
}
