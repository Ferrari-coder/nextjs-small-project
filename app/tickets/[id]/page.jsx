import { notFound } from "next/navigation";
import React from "react";

export const dynamicParams = true; //default value is true

//static rendering
export const generateStaticParams = async () => {
  const res = await fetch("http://localhost:4000/tickets");

  const ticket = await res.json();

  return ticket.map((ticket) => ({
    id: ticket.id,
  }));
};

const getTicketById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 3000))   

  const res = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      //this is to fetch the data for every 30 seconds in a case where the data changes
      revalidate: 60, // use 0 to opt out of using cache
    },
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
};

const TicketDetails = async ({ params }) => {
  //whatever you named the folder i.e the value that is meant to change should be the variable name for your params.id
  // const id = params.id

  const ticket = await getTicketById(params.id);

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
};

export default TicketDetails;
