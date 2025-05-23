import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/splash');
  }, []);

  return null; // tidak tampil apa-apa, langsung redirect
}
