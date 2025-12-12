import { Resource } from './types';

export const SYSTEM_INSTRUCTION = `You are Serene, a warm, compassionate, and supportive mental wellness AI companion. 
Your goal is to listen to the user, validate their feelings, and offer gentle guidance, coping strategies, or cognitive reframing techniques.
Key Guidelines:
1. Tone: Calm, empathetic, non-judgmental, and safe.
2. Structure: Keep responses concise (under 150 words) and easy to read unless the user asks for more detail. Use paragraph breaks.
3. Safety: You are NOT a licensed therapist, doctor, or crisis counselor. You cannot diagnose or prescribe. 
   - If a user indicates immediate self-harm, suicide, or harm to others, you MUST gently but firmly urge them to contact emergency services immediately (e.g., 988 in the US, 112 in EU) and provide a standard crisis disclaimer.
4. Approach: Ask open-ended questions to help the user explore their feelings. Suggest mindfulness, breathing exercises, or journaling when appropriate.
`;

export const INITIAL_MESSAGE = "Hello. I'm Serene. I'm here to listen and support you in a safe, judgment-free space. How are you feeling today?";

export const RESOURCES: Resource[] = [
  {
    id: 'box-breathing',
    title: 'Box Breathing',
    description: 'A simple technique to calm the nervous system.',
    category: 'breathing',
    duration: '2 mins',
    content: `1. Inhale slowly through your nose for 4 seconds.\n2. Hold your breath for 4 seconds.\n3. Exhale slowly through your mouth for 4 seconds.\n4. Hold your breath for 4 seconds.\n\nRepeat this cycle 4-5 times to lower stress levels.`
  },
  {
    id: '54321-grounding',
    title: '5-4-3-2-1 Grounding',
    description: 'Use your senses to anchor yourself in the present moment.',
    category: 'grounding',
    duration: '5 mins',
    content: `Look around and identify:\n- 5 things you can see.\n- 4 things you can feel (touch).\n- 3 things you can hear.\n- 2 things you can smell.\n- 1 thing you can taste.\n\nThis technique helps interrupt anxiety loops.`
  },
  {
    id: 'gratitude-journal',
    title: 'Micro-Gratitude',
    description: 'Shift focus to positive aspects of your day.',
    category: 'affirmation',
    duration: '3 mins',
    content: `Take a moment to write down or think about three small things that went well today. They don't have to be big—a good cup of coffee, a warm ray of sunshine, or a friendly text message all count.`
  },
  {
    id: 'body-scan',
    title: 'Quick Body Scan',
    description: 'Release physical tension you might be holding.',
    category: 'sleep',
    duration: '5 mins',
    content: `Start from your toes and mentally check in with each part of your body. Notice any tension. As you exhale, imagine the tension melting away. Move up to your ankles, calves, knees, all the way to the top of your head.`
  }
];
