// sendMessage.ts
import type { Message } from '../types/Message';

const handleSendMessage = async (
        input: string,
        setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
        setInput: React.Dispatch<React.SetStateAction<string>>
    ) => {
    if (input.trim() === '') return;

    const newMessage: Message = { content: input, role: 'user' };

    // Add user message immediately
    setMessages(prev => [...prev, newMessage]);
    setInput('');

    let aiMessage: Message | null = null;

    try {
        const response = await fetch("http://localhost:3000/api/messages", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newMessage }),
        });

        if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error saving user message:", error);
    }

    try {
        const response = await fetch("http://localhost:3000/api/ai/messages", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ message: newMessage.content }),
            body: JSON.stringify({ message: "hi, how are you" }),
        });

        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        const data = await response.json();
        aiMessage = data;
    } catch (error) {
        console.error("Error getting AI response:", error);
    }

    // Add AI message if it exists
    if (aiMessage) {
        setMessages(prev => [...prev, aiMessage]);
    }
};



export {handleSendMessage};
