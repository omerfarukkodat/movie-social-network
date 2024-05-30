package com.kodat.of.movie.movie;

import org.springframework.data.jpa.domain.Specification;

public class MovieSpecification {

    public static Specification<Movie> withOwnerId(Integer ownerId) {

        return ((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("owner").get("id"), ownerId));

    }
}
