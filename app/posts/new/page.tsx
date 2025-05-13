'use client';

import CreatePost from '@/app/components/CreatePost';
import withAuth from '@/lib/auth/withAuth';

function NewPostPage() {
  return <CreatePost />;
}

export default withAuth(NewPostPage);