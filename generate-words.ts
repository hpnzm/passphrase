import Bun from "bun";
const file = Bun.file("./src/words.txt");

const words = (await file.text()).split("\n");
Bun.write("./src/words.json", JSON.stringify({ words }));
