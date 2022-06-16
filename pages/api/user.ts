import { NextApiRequest, NextApiResponse } from "next";
import { addUser } from "../../lib/repository";

const generateCompletionCode = (len: number) => {
  const lowerCharSet = "abcdedfghijklmnopqrst";
  const upperCharSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digitsSet = "0123456789";
  const allCharSet = lowerCharSet + upperCharSet + digitsSet;

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  let code = "";

  if (len < 3) {
    for (let i = 0; i < len; i++) {
      code += allCharSet.at(allCharSet.length);
    }
    return code;
  }

  code += lowerCharSet.at(getRandomInt(lowerCharSet.length));
  code += upperCharSet.at(getRandomInt(upperCharSet.length));
  code += digitsSet.at(getRandomInt(digitsSet.length));

  for (let i = 0; i < len - 3; i++) {
    code += allCharSet.at(getRandomInt(allCharSet.length));
  }

  return code;
};

export default async function registerUser(req: NextApiRequest, res: NextApiResponse) {
  console.log("koko");
  if (req.method !== "POST") {
    res.status(400).json({ msg: "Invalid request" });
    return;
  }

  if (req.body.externalID === undefined) {
    res.status(400).json({ msg: "Invalid parameter" });
    return;
  }

  const code = generateCompletionCode(8);
  await addUser(req.body.externalID, code);
  res.status(201).end();
  return;
}
