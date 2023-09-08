function ErrorMessage({ message }) {
  return (
    <p className="text-center text-2xl font-bold text-teal-200 pt-10">
      <span>😡 </span>
      {message}
    </p>
  );
}

export default ErrorMessage;
