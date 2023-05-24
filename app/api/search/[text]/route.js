import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';
// Get (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const searchedPrompts = await Prompt.find({
      prompt: params.text,
    });

    if (!searchedPrompts)
      return new Response('Prompt Not Found', { status: 404 });

    return new Response(JSON.stringify(searchedPrompts), { status: 200 });
  } catch (error) {
    return new Response('Failed to Fetch Prompt', { status: 500 });
  }
};
