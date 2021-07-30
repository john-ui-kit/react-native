import React from 'react';
export default function TimerText(props: {
    unit: 'second' | 'minute';
    slot: React.FunctionComponent<{
        endTimestamp: number;
        countDown: number;
        hour: number;
        second?: number;
        minute: number;
    }>;
    expiryTimestamp: number;
}): JSX.Element;
