import axios from "axios"

export function PaintingsShow(props) {
  console.log(props)
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdatePainting(props.painting.id, params);

    console.log('handling submit');
  }

  const handleAddToCart = (event) => {
    console.log('adding to cart')
    event.preventDefault()
    const params = new FormData(event.target);
    axios.post("http://localhost:3000/carted_paintings.json", params).then(response => {
      console.log(response.data)

    })
  }

  return (
    <div>
      <p><b>id:</b>{props.painting.id}</p>
      <p><b>name:</b>{props.painting.name}</p>
      <p><b>price:</b>{props.painting.price}</p>
      <p><b>description:</b>{props.painting.description}</p>

      <form onSubmit={handleAddToCart}>
        <p>quantity: <input name="quantity" type="text" defaultValue={0} /></p>
        <p> <input name="product_id" type="hidden" defaultValue={props.painting.id} /></p>
        <button type="input">Add painting to cart</button>
      </form>
      <br />      

    </div>
  )
}