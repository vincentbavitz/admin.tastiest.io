import { useRouter } from 'next/router';
import { useEffect } from 'react';

function _404() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, []);
  return <></>;
}

export default _404;
