export function BeforeAfterFlow() {
  const beforeSteps = [
    "Open chat",
    "Leave chat",
    "Go to event page",
    "Fill in all details",
    "Create event",
    "Return to chat & share",
  ];

  const afterSteps = [
    "Open chat",
    "Tap Ollie — plan inline",
    "Select & confirm event",
    "Shared to group",
  ];

  return (
    <div className="grid grid-cols-2 gap-8 my-8">
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-medium text-[#2a2a2a] mb-2">Before</p>
        {beforeSteps.map((step, i) => (
          <div key={i} className="flex flex-col items-center w-full">
            <div className="w-full border border-[#d4d4d0] rounded-md px-3 py-2 text-sm text-center text-[#555]">
              {step}
            </div>
            {i < beforeSteps.length - 1 && (
              <div className="h-4 w-px bg-[#d4d4d0]" />
            )}
          </div>
        ))}
        <p className="text-xs text-[#999] mt-2">6 steps, 3+ screens</p>
      </div>

      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-medium text-[#2a2a2a] mb-2">After</p>
        {afterSteps.map((step, i) => (
          <div key={i} className="flex flex-col items-center w-full">
            <div className="w-full border border-[#1D9E75] bg-[#E1F5EE] rounded-md px-3 py-2 text-sm text-center text-[#085041]">
              {step}
            </div>
            {i < afterSteps.length - 1 && (
              <div className="h-4 w-px bg-[#1D9E75] opacity-40" />
            )}
          </div>
        ))}
        <p className="text-xs text-[#999] mt-2">1 screen, never left chat</p>
      </div>
    </div>
  );
}

export function KeyInsightCallout() {
  return (
    <div className="border border-[#0F6E56] bg-[#E1F5EE] rounded-xl px-6 py-5 my-8">
      <p className="text-sm font-medium text-[#04342C]">
        The drop-off wasn&apos;t about motivation.
      </p>
      <p className="text-sm text-[#085041] mt-1">
        Users had intent but no way to act on it without breaking the conversation.
        The solution wasn&apos;t a better creation form, it was removing the need
        to leave the chat at all.
      </p>
    </div>
  );
}
