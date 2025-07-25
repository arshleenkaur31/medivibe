
    let conversations = [];
    let currentConversation = [];

    const historyPanel = document.getElementById('history');
    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');

    userInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
      }
    });

    function newChat() {
      if (currentConversation.length) {
        conversations.push(currentConversation);
        renderHistory();
      }
      currentConversation = [];
      chatBox.innerHTML = `<div class="message assistant"><div class="bubble">Hello! I'm MediVibe. How can I assist you today? 🎧</div></div>`;
    }

    function renderHistory() {
      historyPanel.innerHTML = '';
      conversations.forEach((conv, index) => {
        const item = document.createElement('div');
        item.className = 'history-item';
        item.textContent = `Chat #${index + 1}`;
        item.onclick = () => loadConversation(index);
        historyPanel.appendChild(item);
      });
    }

    function loadConversation(index) {
      currentConversation = [...conversations[index]];
      chatBox.innerHTML = '';
      currentConversation.forEach(({sender, text}) => appendMessage(text, sender, false));
    }

    function appendMessage(text, sender, save = true) {
      const msg = document.createElement('div');
      msg.className = `message ${sender}`;
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.textContent = text;
      msg.appendChild(bubble);
      chatBox.appendChild(msg);
      chatBox.scrollTop = chatBox.scrollHeight;
      if (save) currentConversation.push({sender, text});
    }

    function sendMessage() {
      const text = userInput.value.trim();
      if (!text) return;
      appendMessage(text, 'user');
      userInput.value = '';
      const response = assistantReply(text);
      setTimeout(() => appendMessage(response, 'assistant'), 500);
      speak(response);
    }

    function startVoice() {
      if (!('webkitSpeechRecognition' in window)) {
        alert('Your browser does not support speech recognition.');
        return;
      }
      const recognition = new webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.start();

      recognition.onresult = function(event) {
        const text = event.results[0][0].transcript;
        appendMessage(text, 'user');
        const response = assistantReply(text);
        setTimeout(() => appendMessage(response, 'assistant'), 500);
        speak(response);
      };
    }
// ...existing code...
function assistantReply(input) {
  let text = input
    .toLowerCase()
    .replace(/\b(u|ur|n)\b/g, m => ({ u: 'you', ur: 'your', n: 'and' }[m]))
    .replace(/\s+/g, ' ')
    .trim();

  if (/^(hi|hello|hey)/.test(text)) return "Hello! How can I assist you today?";
  if (/bye|goodbye|see you/.test(text)) return "Goodbye! Take care of your health!";
  if (/thank/.test(text)) return "You're welcome! Always here for you.";
  if (/how are you/.test(text)) return "I'm healthy as ever! How about you?";
  if (/help/.test(text)) return "I can help with booking appointments, symptom triage, setting reminders, test info, and more!";
  if (/appointment|book/.test(text)) return "Let's book your appointment. Please tell me the date and doctor.";
  if (/available|slots|schedule/.test(text)) return "Here are the next available slots: tomorrow 10am, tomorrow 4pm, day after 11am.";
  if (/doctor|specialist|dermatologist|pediatrician|cardiologist/.test(text)) return "We have Dr. Smith (Cardiologist), Dr. Patel (Dermatologist), Dr. Jones (Pediatrician), Dr. Khan (General).";
  if (/cancel|reschedule/.test(text)) return "Sure. Do you want to cancel or pick a new date?";
  if (/remind|reminder|medicine|medication|pill/.test(text)) return "Reminder set! Please tell me the time.";
  if (/test|blood|scan|x-ray|mri/.test(text)) return "I can help book lab tests. Which test do you need?";
  if (/result|report/.test(text)) return "You can upload your report here for review.";
  if (/fever|cough|cold|headache|pain/.test(text)) return "How long have you had these symptoms? Do you need a doctor?";
  if (/chest pain|breathless|difficulty breathing/.test(text)) return "This is an emergency. Please go to the nearest hospital immediately!";
  if (/urgent|emergency/.test(text)) return "Call 911 or go to the ER. Your safety comes first.";
  if (/mental|depression|anxiety|stress/.test(text)) return "Mental health matters. I can connect you with a counselor or book an appointment.";
  if (/diet|nutrition|meal|food/.test(text)) return "I can suggest healthy meal plans or connect you with a nutritionist.";
  if (/exercise|workout|fitness/.test(text)) return "Stay active! I can recommend routines or track your fitness goals.";
  if (/sleep|insomnia/.test(text)) return "Are you having trouble sleeping? I can suggest relaxation techniques.";
  if (/pregnant|pregnancy/.test(text)) return "Congratulations! I can help schedule prenatal visits or give tips.";
  if (/baby|child|pediatric/.test(text)) return "Pediatric care is important. Shall I help you find a child specialist?";
  if (/vaccin|shot|immuni/.test(text)) return "I can show vaccination schedules or help book one.";
  if (/allergy|allergic/.test(text)) return "Noted. Do you need antihistamines or a specialist?";
  if (/skin|rash|acne/.test(text)) return "Let me connect you with a dermatologist.";
  if (/eye|vision|ophthalmologist/.test(text)) return "Eye health is vital. Shall I help you book an ophthalmologist?";
  if (/ear|nose|throat|ent/.test(text)) return "ENT specialist booking available. Want to proceed?";
  if (/heart|cardio/.test(text)) return "Heart health matters. I can schedule with a cardiologist.";
  if (/diabet/.test(text)) return "I can help you manage diabetes. Want tips or appointments?";
  if (/asthma|breath/.test(text)) return "Stay safe. I can help you track inhaler use or see a doctor.";
  if (/bp|blood pressure/.test(text)) return "I can help you log readings or consult a doctor.";
  if (/cancer|oncologist/.test(text)) return "I can connect you to an oncologist or share resources.";
  if (/covid|corona/.test(text)) return "Stay safe. Need symptoms check or testing locations?";
  if (/flu|virus/.test(text)) return "Please monitor symptoms. Want to talk to a doctor?";
  if (/medicine|pharmacy|drug/.test(text)) return "I can find nearby pharmacies or set reminders.";
  if (/ambulance/.test(text)) return "Calling an ambulance for you is the best choice in emergencies.";
  if (/location|nearby|hospital/.test(text)) return "Finding nearby hospitals...";
  if (/insurance/.test(text)) return "Please share your provider details for claims assistance.";
  if (/blood donation|donate/.test(text)) return "Thank you for your interest! I can find drives nearby.";
  if (/joke|funny/.test(text)) return "Why did the doctor carry a red pen? In case they needed to draw blood!";
  if (/who are you|what are you/.test(text)) return "I'm MediVibe, your AI healthcare assistant!";
  if (/name/.test(text)) return "I'm MediVibe. What's your name?";
  if (/age/.test(text)) return "I don't age, but I can track yours for medical records.";
  if (/weather/.test(text)) return "I'm all about health, not weather. Try a weather app!";
  if (/time/.test(text)) return `It's currently ${new Date().toLocaleTimeString()}`;
  if (/date/.test(text)) return `Today's date is ${new Date().toLocaleDateString()}`;
  if (/how/.test(text)) return "Could you tell me more so I can help better?";
  if (/why/.test(text)) return "That's a good question. Let's discuss it more!";
  if (/ok|okay/.test(text)) return "Noted! Anything else?";
  if (/fine|good/.test(text)) return "That's great to hear!";
  if (/bad|sad/.test(text)) return "I'm here for you. Want to talk about it?";
  if (/no|nah/.test(text)) return "Okay! Let me know if you need anything.";
  if (/yes|yeah|yep/.test(text)) return "Got it. Let's continue!";
  if (/sure/.test(text)) return "Alright. What's next?";
  if (/maybe/.test(text)) return "Take your time! I'm here when you're ready.";
  if (/idk|don't know/.test(text)) return "That's okay! Tell me what you're feeling or thinking.";
  if (/lol|haha/.test(text)) return "Glad you find it funny!";
  if (/bored/.test(text)) return "Want to hear a joke or health tip?";
  if (/sleepy|tired/.test(text)) return "Rest is important. Make sure you get enough sleep.";
  if (/hungry|food/.test(text)) return "Don't skip meals! Need nutrition advice?";
  if (/thirsty|drink/.test(text)) return "Stay hydrated! Drink some water.";
  if (/love/.test(text)) return "Love is the best medicine!";
  if (/hate/.test(text)) return "Let's keep it positive here.";
  if (/lonely/.test(text)) return "I'm always here to chat.";
  if (/confused/.test(text)) return "Let me know what you're unsure about.";
  if (/sick|unwell/.test(text)) return "I'm sorry to hear that. Can you tell me your symptoms?";
  if (/feeling/.test(text)) return "How are you feeling today? Tell me more.";
  if (/plan|schedule/.test(text)) return "Let's plan your health tasks. What do you need?";
  if (/emergency/.test(text)) return "Please call 911 or visit your nearest hospital immediately!";
  if (/nausea|vomit|throw up/.test(text)) return "I'm sorry you're feeling sick. How long has this been happening?";
  if (/dizzy|lightheaded/.test(text)) return "Please sit down and rest. If it's severe or sudden, see a doctor right away.";
  if (/burn|burns/.test(text)) return "For burns, cool the area with water. Is it minor or severe?";
  if (/cut|bleed/.test(text)) return "Apply pressure to stop bleeding. If it's deep or won't stop, seek medical help.";
  if (/infection|pus|redness/.test(text)) return "That may be an infection. I suggest seeing a doctor for antibiotics if needed.";
  if (/allergic reaction|rash|itchy/.test(text)) return "Allergies can be tough. Do you have antihistamines? If severe, see a doctor.";
  if (/headache|migraine/.test(text)) return "Rest in a dark, quiet room. Drink water and take pain relievers if needed.";
  if (/stomach ache|abdominal pain/.test(text)) return "Please describe your symptoms. It could be indigestion, gas, or something more serious.";
  if (/chills|fever/.test(text)) return "Monitor your temperature. If it's high or persistent, see a doctor.";
  if (/cough|sore throat/.test(text)) return "Stay hydrated and rest. If it worsens, consider seeing a doctor.";
  if (/runny nose|congestion/.test(text)) return "Allergies or a cold? Stay hydrated and rest. If severe, see a doctor.";
  if (/diarrhea|constipation/.test(text)) return "Stay hydrated. If it persists or is severe, see a doctor.";
  if (/urine|pee|bladder/.test(text)) return "If you have pain or blood, please see a doctor. Otherwise, stay hydrated.";
  if (/pregnant|pregnancy/.test(text)) return "Congratulations! Prenatal care is important. Do you need help booking appointments?";
  if (/birth control|contraception/.test(text)) return "I can help you find options or book an appointment with a specialist.";
  if (/menstrual|period/.test(text)) return "Menstrual health is important. Do you need tips or help with symptoms?";
  if (/vaccine|vaccination/.test(text)) return "Vaccines are crucial for health. Do you need help booking one?";
  if (/mental health|therapy|counseling/.test(text)) return "Mental health matters. I can connect you with a counselor or therapist.";
  if (/exercise|fitness|workout/.test(text)) return "Staying active is key! Do you need workout tips or a fitness plan?";
  if (/nutrition|diet|meal plan/.test(text)) return "Nutrition is vital. I can help with meal plans or connect you with a nutritionist.";
  if (/quit|exit|stop/.test(text)) {
    return "Sorry, I didn't quite understand. Could you rephrase or try something else?";
  }

  // Default fallback
  return "Sorry, I didn't quite understand. Could you rephrase or try something else?";
}
// ...existing code...


    function speak(text) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  