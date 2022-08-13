import { NextPageContext } from 'next';
import { EditPage } from '../../modules/EditPage';

export const getServerSideProps = async (context: NextPageContext) => {
  const res = await fetch(`http://localhost:3000/api/${context.query.id}`);
  const entry = await res.json();

  if (entry.error) {
    return {
      notFound: true,
    };
  }

  return {
    props: { entry },
  };
};

export default EditPage;
