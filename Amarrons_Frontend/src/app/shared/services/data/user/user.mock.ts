const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2FteSIsInJvbGUiOnsiaWQiOjMsImNvZGUiOiIzIiwibGFiZWwiOiJhZG1pbiJ9LCJpZCI6MSwiaWF0IjoxNjAwNzYwNTkxfQ.ZOjNaXCe79h9-9Ng3mAnNEAChmIM-DaWAPgDfBShjZ8';

export const mock_login_admin = {
  token: adminToken,
  name: "Samy",
  role: {
    id: 3,
    code: "3",
    label: "admin"
  },
  isValid: true
}

const simpleToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUmFvdWwiLCJyb2xlIjp7ImlkIjoxLCJjb2RlIjoiMSIsImxhYmVsIjoic2ltcGxlLXVzZXIifSwiaWQiOjIsImlhdCI6MTYxMTU4NjI2Nn0.2PJM2LSW9olDyS17yUPkgRex-aedP4TB6ZVgcKQLHUQ';

export const mock_login_simple = {
  token: simpleToken,
  name: "Raoul",
  role: {
    id: 1,
    code: "1",
    label: "simple-suer"
  }
}

const modoToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUm9zYSIsInJvbGUiOnsiaWQiOjIsImNvZGUiOiIyIiwibGFiZWwiOiJtb2RvIn0sImlkIjozLCJpYXQiOjE2MDA3NjA1OTF9.yZBWmQY6b9rEdLqcsUnes8-dVVt3Yy5G3iCUXiHNt1c';

export const mock_login_modo = {
  token: modoToken,
  name: "Rosa",
  role: {
    id: 2,
    code: "2",
    label: "modo"
  }
}
