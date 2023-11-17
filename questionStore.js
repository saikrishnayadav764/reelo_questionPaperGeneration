// questionStore.js
const generateDummyData = (count) => {
    const dummyData = [];
    for (let i = 1; i <= count; i++) {
      dummyData.push({
        question: `Question ${i}`,
        subject: `Subject ${i % 5}`,
        topic: `Topic ${i % 10}`,
        difficulty: ['Easy', 'Medium', 'Hard'][i % 3],
        marks: Math.floor(Math.random() * 10) + 1,
      });
    }
    return dummyData;
  };
  
  const questionStore = generateDummyData(50);
  
  module.exports = questionStore;
  