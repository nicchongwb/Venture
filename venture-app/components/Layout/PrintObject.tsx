import React from 'react'

type Props = {
  content: object
}

const PrintObject = ({ content }: Props) => {
  const formattedContent: string = JSON.stringify(content, null, 2)

  return (
  <div className=" mx-auto px-16 py-8">
    <h3>Name: {content.customer_details.name}</h3>
    <h4>Email: {content.customer_details.email}</h4>
    <br/>
    <p>Funded: ${content.payment_intent.amount_received}</p>
    <p>Currency: {content.payment_intent.charges.data[0].currency }</p>
    <p>Card: {content.payment_intent.charges.data[0].payment_method_details.card.brand }</p>
    
  </div>
  
  )
}

export default PrintObject
