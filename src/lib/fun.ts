// all the code for making fun stuff happen

const flavourText = [
  "LOVE YOURSELF",
  "Hack the planet!",
  "all your base are belong to us!",
  "must construct additional pylons",
  "Everybody's dead, Dave.",
  "Stay strange and be ace -- Yard Act",
  "I'm a rocketman!",
  "It's a fixer-upper!",
  "💜",
  "Sibelius crashed",
  "All toasters toast toast",
  "Trans rights are human rights!",
  ":wq",
];

export function getFlavourText() {
  return flavourText[Math.floor(Math.random() * flavourText.length)];
}

export function isBirthday() {
  const today = new Date();
  const birthday = new Date(today.getFullYear(), 3, 13);
  const check =
    today.getMonth() === birthday.getMonth() &&
    today.getDate() === birthday.getDate();
  console.log(check);
  return check;
}

export function getClacks(): string {
  const clacks: string[] = ["Terry Pratchett", "Bram Moolenaar", "Alan Turing", "Haskell Curry", "Brianna Ghey"];
  return clacks.join(", ");
}