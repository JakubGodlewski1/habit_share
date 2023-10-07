import Image from "next/image";
import many_heroes from "../../../../public/many_heroes.svg"
import Link from "next/link";

const HeroPage = () => {
    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <Image className="max-h-[35vh] w-auto lg:max-h-[80vh]" src={many_heroes} alt="heroes"/>
                <div className='flex flex-col items-center lg:items-start'>
                    <h1 className="text-6xl lg:text-8xl font-bold text-center lg:text-left">Become a habit hero!</h1>
                    <p className="text-2xl lg:text-3xl py-6 text-center lg:text-left">Compete with your friends <br/> at <span className="text-2xl lg:text-3xl underline">getting better!</span></p>
                    <Link href="/sign-up">
                        <button className="btn btn-accent btn-lg">Get Started</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HeroPage;