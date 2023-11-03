import Link from "next/link";
import React from "react";

const getTickets = async () => {
  //since the fetching of data happens almost immediately we are going to imitate a delay so that we can see the suspense and loading ui for 3 secs before the data is fetched
  await new Promise(resolve => setTimeout(resolve, 3000)) // wait for the promise to resolve for 3 seconds and after 3secs it moves to the next function which is the fetching of data

  const res = await fetch("http://localhost:4000/tickets", {
    next: {
      //this is to fetch the data for every 30 seconds in a case where the data changes
      revalidate: 0, // use 0 to opt out of using cache
    },
  });
 
  return res.json(); 
};

const TicketList = async () => {
  const tickets = await getTickets();

  return (
    <>
      {tickets.map((ticket) => (
        <Link href={`/tickets/${ticket.id}`} key={ticket.id} >
          <div className="card my-5">
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}...</p>
            <div className={`pill ${ticket.priority}`}>
              {ticket.priority} priority
            </div>
          </div>
        </Link>
      ))}
      {tickets.length === 0 && (
        <p className="text-center">
          There are no open tickets, Check back later.{" "}
        </p>
      )}
    </>
  );
};

export default TicketList;
