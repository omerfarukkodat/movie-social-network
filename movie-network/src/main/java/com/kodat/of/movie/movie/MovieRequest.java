package com.kodat.of.movie.movie;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record MovieRequest(
    Integer id ,
    @NotNull(message = "100")
    @NotEmpty(message = "100")
    String title,
    @NotNull(message = "101")
    @NotEmpty(message = "101")
    String directorName,
    @NotNull(message = "102")
    @NotEmpty(message = "102")
    String synopsis,
    boolean shareable
) {
}
