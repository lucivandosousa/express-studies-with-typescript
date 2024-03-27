import express, {Request, Response} from "express"

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())

interface Product {
  id: string
  description: string
  price: number
  quantity: number
}

const products: Product[] = []

app.get("/", (req: Request, res: Response) => {
  res.send("Express com TypeScript")
})

app.post("/products", (req: Request, res: Response) => {
  const { ...data } = req.body
  const id = crypto.randomUUID()
  products.push({ id, ...data })
  res.send("Produto cadastrado.")
})

app.get("/products", (req, res) => {
  res.send(products)
})

app.put("/products/:id", (req: Request, res: Response) => {
  const { id } = req.params
  const { ...data } = req.body
  let index = products.findIndex((product) => product.id === id)
  products[index] = { ...products[index], ...data}
  res.send("Produto atualizado.")
})

app.delete("/products/:id", (req: Request, res: Response) => {
  const { id } = req.params
  const index = products.findIndex((product) => product.id === id)
  products.splice(index, 1)
  res.send("Produto excluído.")
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))