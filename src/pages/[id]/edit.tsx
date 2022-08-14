import { NextPageContext } from 'next';
import { EditPage } from '../../modules/EditPage';

export const getServerSideProps = async (context: NextPageContext) => {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/${context.query.id}`
  );
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
