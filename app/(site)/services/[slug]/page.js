export default function ServiceDetailPage({ params }) {
    const { slug } = params;

    console.log("Service slug:", slug);

    return (
        <section className="py-20 bg-white text-black">
            <div className="container mx-auto px-6 md:px-10 lg:px-16 text-center">
                <h1 className="text-4xl font-bold mb-4 capitalize">
                    {slug} Services
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Find trusted {slug} professionals across Chicago — verified, rated,
                    and ready to serve your home.
                </p>
                {/* You can later add provider listings or filtering here */}
            </div>
        </section>
    );
}
