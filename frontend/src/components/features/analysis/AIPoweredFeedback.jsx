import React from 'react';
import { CheckCircle, Lightbulb, TrendingUp } from 'lucide-react';
import Accordion from '../../ui/Accordion';

const AIPoweredFeedback = ({ feedback }) => {
  if (!feedback) return null;

  const { strengths, improvements, suggestions } = feedback;

  const feedbackItems = [
    {
      id: 'strengths',
      title: 'Key Strengths',
      content: strengths,
      icon: <CheckCircle className="text-success" />,
    },
    {
      id: 'improvements',
      title: 'Areas for Improvement',
      content: improvements,
      icon: <Lightbulb className="text-warning" />,
    },
    {
      id: 'suggestions',
      title: 'Actionable Suggestions',
      content: (
        <ul className="list-disc pl-5 space-y-2">
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      ),
      icon: <TrendingUp className="text-accent" />,
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Actionable Feedback from your AI Coach</h2>
      <div className="space-y-3">
        {feedbackItems.map(item => (
          <Accordion key={item.id} title={item.title} icon={item.icon}>
            {typeof item.content === 'string' ? (
              <p className="text-secondary-text">{item.content}</p>
            ) : (
              item.content
            )}
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default AIPoweredFeedback;
