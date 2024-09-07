import Card from "@/components/card";

export default function Home() {
  const products = [
    {
      id:0,
      name:"Mushroom Orange Lamp",
      description:"Mushroom Orange Lamp desc",
      price: 100,
      imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPMFVKYfJpJazShIE-HurrHpLp-dO4COPDrQ&s"
    }
  ]
  return (
      <main className="min-h-screen mx-auto max-w-[100rem]">
        {products.map(product=>(
          <Card key={`${product.name}-${product.id}`} {...product}/>
        ))}
      </main>
  );
}
