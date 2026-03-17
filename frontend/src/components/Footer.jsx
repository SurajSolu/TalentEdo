function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-lg font-semibold text-white mb-2">TalentEdo</p>
        <p className="text-sm">Empowering careers through offline tech education.</p>
        <p className="text-sm mt-4">&copy; {new Date().getFullYear()} TalentEdo. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
