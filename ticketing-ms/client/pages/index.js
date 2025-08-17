import Link from 'next/link';

const Landing = ({ currentUser, tickets }) => {
  const ticketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link
            className='nav-link'
            href='/tickets/[ticketId]'
            as={`/tickets/${ticket.id}`}
          >
            View
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h1>Tickets</h1>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
};

Landing.getInitialProps = async (context, client, currentUser) => {
  try {
    const { data } = await client.get('/api/tickets');

    return { tickets: data };
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return { tickets: [] };
  }
  // const { data } = await client.get('/api/tickets');

  // return { tickets: data };
};

export default Landing;
