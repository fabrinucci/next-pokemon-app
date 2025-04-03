export const SkeletonPokemonHomeCard = () => {
  return (
    <div className='grid grid-cols-auto-fill gap-x-6 gap-y-8 px-6 py-4'>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className='h-60 animate-pulse rounded-xl bg-zinc-700'
        />
      ))}
    </div>
  );
};
