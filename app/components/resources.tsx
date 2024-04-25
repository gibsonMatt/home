import Link from 'next/link'
import { resource_data } from 'app/resources/resource_data'





export function Resources() {

    return (

        <div>
            <ul className="list-disc">
                {resource_data.map(

                    (item) => {
                        return (
                            <div className="flex-row md:flex-row pb-2">
                                <a href={item.link}>
                                    <li className="text-neutral-900 dark:text-neutral-100 tracking-tight hover:text-blue-600">
                                        {item.name}
                                    </li>
                                </a>
                            </div>
                        )
                    }
                )}
            </ul>
        </div>
    )
}
