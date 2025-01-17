import illustration from "../assets/react.svg";
import FormComponent from "../components/forms/formComponent";

function HomePage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-16">
            <div className="my-12 flex h-full min-w-full flex-col items-center justify-evenly sm:flex-row sm:pt-0">
                {/* Illustration Section */}
                <div className="flex w-full animate-up-down justify-center sm:w-1/2 sm:pl-4">
                    <img
                        src={illustration}
                        alt="An illustration representing real-time code collaboration"
                        className="mx-auto w-[250px] sm:w-[400px]"
                        loading="lazy"
                    />
                </div>

                {/* Form Section */}
                <div className="flex w-full items-center justify-center sm:w-1/2">
                    <FormComponent />
                </div>
            </div>

            {/* Footer (Uncomment when ready) */}
            {/* TODO: Add Footer component for page navigation or additional information */}
            {/* <Footer /> */}
        </div>
    );
}

export default HomePage;
