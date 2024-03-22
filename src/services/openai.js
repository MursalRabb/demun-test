import { OpenAI } from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function createThread() {
  try {
    const myThread = await openai.beta.threads.create();
    console.log("New thread created with ID:", myThread.id);
    return myThread.id;
  } catch (error) {
    console.error("Error creating thread:", error);
    throw error;
  }
}

export async function sendMessageAndRetrieveResponse(
  threadId,
  prompt,
  assistantId
) {
  try {
    const myThreadMessage = await openai.beta.threads.messages.create(
      threadId,
      {
        role: "user",
        content: prompt,
      }
    );

    const myRun = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
    });

    const retrieveRun = async () => {
      let keepRetrievingRun;

      while (myRun.status !== "completed") {
        keepRetrievingRun = await openai.beta.threads.runs.retrieve(
          threadId,
          myRun.id
        );

        if (keepRetrievingRun.status === "completed") {
          break;
        }
      }
    };

    await retrieveRun();

    const allMessages = await openai.beta.threads.messages.list(threadId);
    return allMessages.data[0].content[0].text.value;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// sendMessageAndRetrieveResponse(
//   "thread_VRd2K4vgv7krK0MPTkYCg2R3",
//   "what are the most concerning issues?",
//   "asst_ty2q2wM52LBUuTB0vcDBLTEz"
// );
